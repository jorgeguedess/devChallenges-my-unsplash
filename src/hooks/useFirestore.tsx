import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { ImageDataProps } from "@/types/image";

const useFireStore = (collectionName: string) => {
  const [docs, setDocs] = useState<ImageDataProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe: () => void;

    const getData = async () => {
      try {
        const q = query(
          collection(db, collectionName),
          orderBy("createdAt", "desc"),
        );
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images: ImageDataProps[] = [];
          querySnapshot.forEach((doc) => {
            const id = doc.id;
            const url = doc.data().url;
            const createdAt = doc.data().createdAt.toDate();
            const name = doc.data().name;
            images.push({ id, url, createdAt, name });
          });
          setDocs(images);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    return () => unsubscribe && unsubscribe();
  }, [collectionName]);


  return {
    docs,
    isLoading,
  };
};

export default useFireStore;
