import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { db, storage } from "@/services/firebase";
import { usePhoto } from "@/context/contextImage";

import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";

import { ImageDataProps } from "@/types/image";


const useStorage = (collectionName: string) => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const {legend} = usePhoto();

  const startUpload = async (file: File) => {
    if (!file) return;

    const fileId = uuidv4();
    const formatFile = file.type.split("/")[1];

    const storageRef = ref(storage, `${collectionName}/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProgress(progress);

        // store data into firestore
        await addDoc(collection(db, collectionName), {
          id: fileId,
          url: downloadURL,
          createdAt: new Date(),
          name: legend,
        });
      }
    );
  };

  const deleteImage = async (image: ImageDataProps) => {
    try {
        const deleteRef = ref(storage,image.url)
        await deleteObject(deleteRef);

        const docRef = doc(db, collectionName, image.id)
        await deleteDoc(docRef);

        return {succes: "image delete success"}
    } catch (error) {
        console.error(error);
        // setError(error?.message);
        return {error: "image delete fail"}
    }
  }
  

  return {
    progress,
    error,
    startUpload,
    deleteImage,
  };
};

export default useStorage;
