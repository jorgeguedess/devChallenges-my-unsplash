"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageDataProps } from "@/types/image";

export const CardImage = ({imageUrl, photoName}: ImageDataProps) => {
  const [isHovered, setHovered] = useState(false);

  const handleFormDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('arquivo deletado');
  }

  return (
    <div
      className="w-full relative h-full"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <figure
        className="h-full w-full max-h-[16rem]"
        id={imageUrl}
      >
        <Image
          src={imageUrl}
          alt="on image"
          sizes="100vw"
          width={0}
          height={0}
          className="h-full w-full rounded-2xl object-cover object-center"
        />
      </figure>
      <div className={`${isHovered ? "absolute inset-0 flex flex-col bg-black/60 justify-between rounded-2xl p-5" : "static hidden"} transition-all`}>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm" className="rounded-2xl self-end">delete</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[20rem] w-[90%] mx-auto">
            <form onSubmit={handleFormDelete} className="flex flex-col gap-5 items-start">
              <DialogHeader>
                <DialogTitle className="text-2xl font-medium text-primary">Are you sure?</DialogTitle>
              </DialogHeader>
              <DialogFooter className="flex w-full">
                <DialogClose asChild>
                  <Button type="button" variant="ghost" className="text-input flex-1">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                <Button type="submit" variant="destructive" className="flex-1">Delete</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <p className="font-secondary text-lg font-bold text-white max-w-[17.5rem]">{photoName}</p>
      </div>
    </div>
  );
};
