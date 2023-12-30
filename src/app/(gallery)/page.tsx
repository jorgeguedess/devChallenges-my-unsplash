"use client";

import { CardImage } from "./components/card-image";
import useFireStore from "@/hooks/useFirestore";
import { SkeletonGridImage } from "@/components/ui/skeleton-grid-image";
import { usePhoto } from "@/context/contextImage";

export default function GalleryPage() {
  const { docs: images, isLoading } = useFireStore("images");

  const {searchTerm, searchResults} = usePhoto();

  if (isLoading) {
    console.log('carregando...')
    return (
      <SkeletonGridImage/>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 w-full gap-4">
    {searchTerm?.length ? searchResults.map((image) => (
      <CardImage {...image} key={image.imageUrl} />
    )) : images.map((image) => (
      <CardImage {...image} key={image.imageUrl} />
    ))}
    </div>
  );
};
