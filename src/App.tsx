import { css } from "@emotion/react";
import { useState } from "react";
import Picking from "./route/Picking";
import SelectPreset from "./route/SelectPreset";
import Upload from "./route/Upload";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Box from "./ui/Box";
import Button from "./ui/Button";

export default function App() {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [preset, setPreset] = useState(null);
  const prevImages = useLocalStorage({ preset, uploadedPhoto });

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
            prevImages={prevImages}
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
        </div>
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
      <div
        css={css`
          position: fixed;
          bottom: 12px;
          left: 12px;
          opacity: 0.4;
          &:hover {
            opacity: 1;
          }
        `}
      >
        <Box
          css={css`
            padding: 8px;
          `}
        >
          <p>
            Made out of frustration by{" "}
            <a href="https://github.com/SaraVieira">@SaraVieira</a> +{" "}
            <a href="https://www.threads.net/@freezydorito">@freezydorito</a>
          </p>
          <p>
            <a href="https://github.com/walaura/digipick">Code</a> ·
            <a href="https://www.paypal.com/paypalme/walaura/2">Donate</a>
          </p>
        </Box>
      </div>
    </div>
  );
}
