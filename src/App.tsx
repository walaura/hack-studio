import { css } from "@emotion/react";
import React, { useState } from "react";
import Canvas from "./component/Canvas";
import SelectPreset from "./component/SelectPreset";
import Upload from "./route/Upload";
import Box from "./ui/Box";
import Title from "./ui/Title";

export default function App() {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [preset, setPreset] = useState(null);

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
        <div
          css={css`
            width: 30em;
          `}
        >
          <Upload
            uploadedPhoto={uploadedPhoto}
            setUploadedPhoto={(photo) => {
              setPreset(null);
              setUploadedPhoto(photo);
            }}
          />
        </div>
      )}
      {uploadedPhoto && !preset && (
        <SelectPreset onSelect={setPreset} fromImage={uploadedPhoto} />
      )}
      {uploadedPhoto && preset && (
        <Canvas preset={preset} fromImage={uploadedPhoto} />
      )}
    </div>
  );
}
