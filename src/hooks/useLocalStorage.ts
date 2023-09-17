import { useEffect, useState } from "react";
import { TPreset } from "../route/SelectPreset";

const LOCAL_KEY = "digipick-prev";


export const useLocalStorage = ({uploadedPhoto, preset}) => {

    return {prevImages: [], handleLocalStorageSaving: ()=>{}}
    
    const [prevImages, setPrevImages] = useState([]);


const handleLocalStorageSaving = () => {
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
  
    useEffect(() => {
      if (!uploadedPhoto && !preset) {
        const currentLocalStorage = localStorage.getItem(LOCAL_KEY);
        currentLocalStorage && setPrevImages(JSON.parse(currentLocalStorage));
      }
    }, []);

    return {prevImages, handleLocalStorageSaving}
}
