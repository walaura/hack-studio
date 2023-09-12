import { css } from "@emotion/react";
import { useState } from "react";
import Picking from "./route/Picking";
import SelectPreset from "./route/SelectPreset";
import Upload from "./route/Upload";

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
        <Picking preset={preset} fromImage={uploadedPhoto} />
      )}
    </div>
  );
}
