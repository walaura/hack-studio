import { useEffect, useState } from "react";
import { TPreset } from "../route/SelectPreset";

const LOCAL_KEY = "digipick-prev";

const handleLocalStorageSaving = ({
  uploadedPhoto,
  preset,
}: {
  uploadedPhoto: string;
  preset: TPreset;
}) => {
  const currentLocalStorage = localStorage.getItem(LOCAL_KEY);
  const newItem = {
    image: uploadedPhoto,
    preset,
  };
  if (!currentLocalStorage) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify([newItem]));
  } else {
    const newStorage = JSON.stringify([
        newItem,
      ...JSON.parse(currentLocalStorage).slice(0, 2),
    ]);
    localStorage.setItem(LOCAL_KEY, newStorage);
  }
};

export const useLocalStorage = ({uploadedPhoto, preset}) => {
    const [prevImages, setPrevImages] = useState([]);

    useEffect(() => {
      if (uploadedPhoto && preset) {
        handleLocalStorageSaving({ uploadedPhoto, preset });
      }
    }, [uploadedPhoto, preset]);
  
    useEffect(() => {
      if (!uploadedPhoto && !preset) {
        const currentLocalStorage = localStorage.getItem(LOCAL_KEY);
        currentLocalStorage && setPrevImages(JSON.parse(currentLocalStorage));
      }
    }, []);

    return prevImages
}