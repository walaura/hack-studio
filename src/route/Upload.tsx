import { css } from "@emotion/react";
import { useId } from "react";
import { PrevImages, TSetCurrentStatus } from "../components/PrevImages";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Box from "../ui/Box";
import Button from "../ui/Button";
import Flexbox from "../ui/Flexbox";
import Title from "../ui/Title";
import { TPreset } from "./SelectPreset";

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export type TPrevImages = {
  image: string;
  preset: TPreset;
};

export default function Upload({
  uploadedPhoto,
  setUploadedPhoto,
  preset,
  setCurrentStatus,
}: {
  uploadedPhoto?: string;
  setUploadedPhoto: (url: string) => void;
  setCurrentStatus: TSetCurrentStatus;
  preset: TPreset;
}) {
  const { prevImages } = useLocalStorage({ preset, uploadedPhoto });

  return (
    <>
      <PrevImages setCurrentStatus={setCurrentStatus} prevImages={prevImages} />
      <UploadButton
        onChange={async (ev) => {
          URL.revokeObjectURL(uploadedPhoto);
          const b64Image = await blobToBase64(ev.target.files[0]);
          setUploadedPhoto(b64Image);
        }}
      />
    </>
  );
}

function UploadButton({
  onChange,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>
        <Button>
          <div
            css={css`
              padding-left: 8px;
              padding-right: 8px;
            `}
          >
            <Title style="light">Select photo</Title>
          </div>
        </Button>
      </label>
      <input hidden id={id} type="file" onChange={onChange} />
    </>
  );
}
