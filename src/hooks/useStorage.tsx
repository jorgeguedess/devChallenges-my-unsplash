import { useState } from "react";
import { db, storage } from "@/services/firebase";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { usePhoto } from "@/context/contextImage";
import { ImageProps } from "next/image";

const useStorage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const {legend} = usePhoto();

  const startUpload = async (file: File) => {
    if (!file) return;

    const fileId = uuidv4();
    const formatFile = file.type.split("/")[1];

    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
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
        await addDoc(collection(db, "images"), {
          id: fileId,
          imageUrl: downloadURL,
          createdAt: new Date(),
          photoName: legend,
        });
      }
    );
  };


  return {
    progress,
    error,
    startUpload,
  };
};

export default useStorage;
