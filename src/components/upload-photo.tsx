"use client";

import useStorage from "@/hooks/useStorage";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";

import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePhoto } from "@/context/contextImage";

export const UploadPhoto = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedURL, setSelectedURL] = useState<string | null>(null);
    const { startUploadFile, startUploadUrl } = useStorage("images");
    const {legend, setLegend} = usePhoto();
    const [typeUpload, setTypeUpload] = useState<"url" | "file">("file");

    const handleTypeUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
      const name = (event.target as HTMLButtonElement).name as any;
      if (name === typeUpload) return;
      console.log('mudou')
      setTypeUpload(name);
      setSelectedFile(null);
      setSelectedURL(null);
    };
    
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          setSelectedFile(event.target.files[0]);
        }
      };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedURL) {
          startUploadUrl(selectedURL);
        }
        if (selectedFile) {
          startUploadFile(selectedFile);
        }
        setSelectedFile(null);
        setSelectedURL(null);
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
          Upload by
        </Label>
        <div className="flex flex-wrap items-center justify-between w-full gap-2">
          <div className="flex w-full bg-gray-200 rounded-lg p-1 flex-1">
            <Button 
            type="button" 
            variant="link" 
            className={`text-cyan-950 flex-1 ${typeUpload === "url" && "bg-white"}`} 
            onClick={handleTypeUpload}
            name="url"
            >
              URL
            </Button>
            <Button 
            type="button" 
            variant="link" 
            className={`text-cyan-950 flex-1 ${typeUpload === "file" && "bg-white"}`} 
            onClick={handleTypeUpload}
            name="file"
            >
              File
          </Button>
          </div>
          {typeUpload === "file" ?  
            <Input
              onChange={handleFileChange}
                placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r.."
                className="flex-1 block w-full text-sm text-gray-500
                file:me-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:file:bg-blue-500
                dark:hover:file:bg-blue-400 border border-primary cursor-pointer min-w-16"
                type="file"
                id="url"
                required
              /> : 
              <Input
              onChange={({target}) => setSelectedURL(target.value)}
              className="flex-1 block w-full"
              placeholder="Add a link"
              type="url"
              required
              />
            }
       
        </div>
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="ghost" className="text-input">Cancel</Button>
      </DialogClose>
      <DialogClose asChild>
      <Button 
      type="submit" 
      disabled={!selectedFile && !selectedURL}
      className="flex items-center">
        Submit
      </Button>
      </DialogClose>
    </DialogFooter>
  </form>
  )
}