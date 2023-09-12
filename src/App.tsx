import { css } from "@emotion/react";
import { useState } from "react";
import Picking from "./route/Picking";
import SelectPreset from "./route/SelectPreset";
import Upload from "./route/Upload";
import Box from "./ui/Box";
import Title from "./ui/Title";
import Flexbox from "./ui/Flexbox";
import { useLocalStorage } from "./component/useLocalStorage";
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
      {!uploadedPhoto && !preset && (
        <div
          css={css`
            width: 30em;
          `}
        >
          <Flexbox gap={12} direction="column">
            <Upload
              uploadedPhoto={uploadedPhoto}
              setUploadedPhoto={async (photo) => {
                setPreset(null);
                setUploadedPhoto(photo);
              }}
            />
            {prevImages.length ? (
              <Box>
                <Title>Your previous images</Title>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    overflow: auto;
                    gap: 20px;
                    margin-top: 20px;
                  `}
                >
                  {prevImages.map((prevImage) => (
                    <button
                      css={css`
                        padding: 0;
                        background: transparent;
                        border: none;
                        cursor: pointer;
                        transition: all 100ms ease;

                        &:hover {
                          scale: 0.95;
                        }
                      `}
                      onClick={() => {
                        setPreset(prevImage.preset);
                        setUploadedPhoto(prevImage.image);
                      }}
                    >
                      <img
                        css={css`
                          max-width: 125px;
                        `}
                        key={prevImage.image}
                        src={prevImage.image}
                      />
                    </button>
                  ))}
                </div>
              </Box>
            ) : null}
          </Flexbox>
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
