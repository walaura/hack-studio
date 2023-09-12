import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Picking from "./route/Picking";
import SelectPreset, { TPreset } from "./route/SelectPreset";
import Upload from "./route/Upload";
import Box from "./ui/Box";
import Title from "./ui/Title";
import Flexbox from "./ui/Flexbox";

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
      ...JSON.parse(currentLocalStorage),
      newItem,
    ]);
    localStorage.setItem(LOCAL_KEY, newStorage);
  }
};

export default function App() {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [preset, setPreset] = useState(null);
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
          <Flexbox gap={12} direction="column">
            <Upload
              uploadedPhoto={uploadedPhoto}
              setUploadedPhoto={async (photo) => {
                setPreset(null);
                setUploadedPhoto(photo);
              }}
            />
            {prevImages.length ? (
              <Box css={css``}>
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
                  {prevImages.slice(0, 3).map((prevImage) => (
                    <button
                      css={css`
                        padding: 0;
                        background: transparent;
                        border: none;
                        cursor: pointer;

                        &:hover {
                          scale: 0.96;
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
