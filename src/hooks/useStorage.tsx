import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { db, storage } from "@/services/firebase";
import { usePhoto } from "@/context/contextImage";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";

import { ImageDataProps } from "@/types/image";
import toast from "react-hot-toast";

const useStorage = (collectionName: string) => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const { legend } = usePhoto();

  const convertUrlToFile = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const filename = url.substring(url.lastIndexOf("/") + 1);
    const fileType = blob.type;
    return new File([blob], filename, { type: fileType });
  };

  const startUpload = async (file: File | string) => {
    try {
      const isUrl = typeof file === "string";
      const fileId = uuidv4();
      const formatFile = isUrl ? "jpg" : file.type.split("/")[1];

      const storageRef = ref(storage, `${collectionName}/${fileId}.${formatFile}`);
      const uploadTask = uploadBytesResumable(storageRef, isUrl ? await convertUrlToFile(file as string) : file as File);

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
      toast.success("image sent successfully!");
    } catch (error) {
      toast.error("Oops! There was a problem sending the image");
      console.error(error);
    }
  };

  const startUploadFile = async (file: File) => {
    if (!file) return;
    startUpload(file);
  };

  const startUploadUrl = async (url: string) => {
    if (!url) return;
    startUpload(url);
  };

  const deleteImage = async (image: ImageDataProps) => {
    try {
      const deleteRef = ref(storage, image.url);
      await deleteObject(deleteRef);

      const docRef = doc(db, collectionName, image.id);
      await deleteDoc(docRef);

      toast.success("image delete success!");
      return { success: "image delete success" };

    } catch (error) {
      console.error(error);
      toast.error("image delete fail");
      return { error: "image delete fail" };
    }
  };

  return {
    progress,
    error,
    startUploadFile,
    startUploadUrl,
    deleteImage,
  };
};

export default useStorage;
