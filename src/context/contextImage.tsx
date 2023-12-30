"use client";

import { ImageDataProps } from "@/types/image";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface PhotoContextType {
    legend: string;
    setLegend: Dispatch<SetStateAction<string>>
    searchResults: ImageDataProps[];
    setSearchResults: Dispatch<SetStateAction<ImageDataProps[]>>;
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const usePhoto = () => {
  const context = useContext(PhotoContext);
  if (!context)
    throw new Error("usePhoto needs to be used within a PhotoProvider");
  return context;
};

interface PhotoProviderProps {
  children: ReactNode;
}

export const PhotoProvider = ({ children }: PhotoProviderProps) => {
  const [legend, setLegend] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ImageDataProps[]>([]);

  const value = {
    legend,
    setLegend,
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
  };

  return (
    <PhotoContext.Provider value={value}>
      {children}
    </PhotoContext.Provider>
  );
};