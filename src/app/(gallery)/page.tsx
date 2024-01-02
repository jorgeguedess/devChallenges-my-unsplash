"use client";

import { CardImage } from "./components/card-image";
import useFireStore from "@/hooks/useFirestore";
import { usePhoto } from "@/context/contextImage";

export default function GalleryPage() {
  const { isLoading } = useFireStore("images");

  const {searchResults} = usePhoto();

  if (isLoading) {
    return (
      <p>carregando...</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 w-full gap-4 auto-rows-max flex-1">
      {!isLoading && searchResults && searchResults?.length ? (
        searchResults.map((image) => (
          <CardImage imageData={image} key={image.url} />
        ))
      ) : (
        <p className="col-span-full text-center">No images found yet.</p>
      )}
    </div>
  );
};
