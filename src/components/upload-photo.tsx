"use client";

import useStorage from "@/hooks/useStorage";
import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePhoto } from "@/context/contextImage";

export const UploadPhoto = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { startUpload } = useStorage("images");
    const {legend, setLegend} = usePhoto();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          setSelectedFile(event.target.files[0]);
        }
      };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedFile) {
          startUpload(selectedFile);
        }
        setSelectedFile(null);
        setLegend("");
      };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
    <DialogHeader>
      <DialogTitle className="text-2xl font-medium text-primary">Add a new photo</DialogTitle>
    </DialogHeader>
    <div className="flex flex-col gap-6 py-4 w-full">
      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="name">
          Label
        </Label>
        <Input
          placeholder="Suspendisse elit massa"
          className="border border-primary p-5"
          type="text"
          id="name"
          required
          onChange={({target}) => setLegend(target.value)}
          value={legend}
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="url">
          Photo URL
        </Label>
        <Input
        onChange={handleFileChange}
          placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r.."
          className="block w-full text-sm text-gray-500
          file:me-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700
          file:disabled:opacity-50 file:disabled:pointer-events-none
          dark:file:bg-blue-500
          dark:hover:file:bg-blue-400 border border-primary cursor-pointer"
          type="file"
          id="url"
          required
        />
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="ghost" className="text-input">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
      <Button type="submit" disabled={!selectedFile} className="flex items-center">
        Submit
      </Button>
      </DialogClose>
    </DialogFooter>
  </form>
  )
}
