import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Home from "./route/Home";
import Picking from "./route/Picking";
import SelectPreset from "./route/SelectPreset";
import Box from "./ui/Box";
import Button from "./ui/Button";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [preset, setPreset] = useState(null);
  const { handleLocalStorageSaving } = useLocalStorage({
    preset,
    uploadedPhoto,
  });

  useEffect(() => {
    if (preset && uploadedPhoto) handleLocalStorageSaving();
  }, [preset, uploadedPhoto]);

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {!uploadedPhoto && !preset && (
        <Home
          preset={preset}
          uploadedPhoto={uploadedPhoto}
          setUploadedPhoto={(photo) => {
            setPreset(null);
            setUploadedPhoto(photo);
          }}
          setCurrentStatus={({ image, preset }) => {
            setUploadedPhoto(image);
            setPreset(preset);
          }}
        />
      )}

      {uploadedPhoto && !preset && (
        <SelectPreset onSelect={setPreset} fromImage={uploadedPhoto} />
      )}
      {uploadedPhoto && preset && (
        <Picking preset={preset} fromImage={uploadedPhoto} />
      )}
      {!(!uploadedPhoto && !preset) && (
        <div
          css={css`
            position: fixed;
            top: 12px;
            left: 12px;
          `}
        >
          <Button
            style="secondary"
            onClick={() => {
              setPreset(null);
              setUploadedPhoto(null);
            }}
          >
            START OVER
          </Button>
        </div>
      )}
    </div>
  );
}
