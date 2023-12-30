"use client";

import { ChangeEvent, useEffect, useMemo } from "react";

import { Icon } from "./icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadPhoto } from "@/components/upload-photo";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import useFireStore from "@/hooks/useFirestore";
import { usePhoto } from "@/context/contextImage";

export const Header = () => {
  const { docs: images } = useFireStore("images");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const {searchTerm, setSearchTerm, setSearchResults} = usePhoto();

  const memoizedSearchResults = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return images.filter((image) =>
      image.photoName.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [images, searchTerm]);

  useEffect(() => {
    setSearchResults(memoizedSearchResults);
  }, [memoizedSearchResults, setSearchResults]);

  return (
    <header className="container flex sm:items-center justify-between py-11 font-main">
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 w-full">
        <Icon.Logo aria-label="My Unsplash - devchallenges.io" />
        <div className="relative flex items-center">
          <Icon.Search className="pointer-events-none  absolute inset-y-0 start-0 flex items-center ps-3.5 text-input" />
          <Input
            placeholder="Search by name"
            className="px-3 py-6 ps-12"
            onChange={handleChange}
            value={searchTerm}
          />
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute right-10 top-10 sm:static">
            <Icon.Upload className="block sm:hidden" />
            <span className="hidden sm:block">Add a photo</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[39rem] w-[90%] mx-auto">
          <UploadPhoto/>
        </DialogContent>
      </Dialog>
    </header>
  );
};
