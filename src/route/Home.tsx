import { TSetCurrentStatus } from "../components/PrevImages";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import Title from "../ui/Title";
import { TPreset } from "./SelectPreset";
import Upload from "./Upload";
import logo from "../../static/logo.webp";
import { css } from "@emotion/react";

export default function Home({
  uploadedPhoto,
  preset,
  setUploadedPhoto,
  setCurrentStatus,
}: {
  uploadedPhoto?: string;
  preset: TPreset;
  setUploadedPhoto: (image: string) => void;
  setCurrentStatus: TSetCurrentStatus;
}) {
  return (
    <Flexbox
      gap={12}
      direction="row"
      align="end"
      css={css`
        max-height: 70vh;
        max-width: 70vw;
      `}
    >
      <div
        css={css`
          max-width: 40em;
        `}
      >
        <img
          src={logo}
          css={css`
            width: auto;
            max-height: 60vh;
            max-width: 30vw;
            transform: rotate(4deg);
            height: auto;
            flex-grow: 0;
            flex-shrink: 0;
            display: block;
          `}
        />
      </div>
      <Flexbox
        gap={12}
        direction="column"
        css={css`
          flex-basis: 0;
          flex-grow: 1;
          flex-shrink: 1;
        `}
      >
        <Box>
          <Flexbox gap={12} direction="column">
            <Title>Digipick helper</Title>
            <p>
              Upload a screenshot from your hacking minigame. This tool will let
              you try to arrange all the picks as many times as you want, and
              then you can just punch them into your game.
            </p>
            <p>16:9, any resolution, pc or xbox</p>
          </Flexbox>
        </Box>
        <Upload
          setCurrentStatus={setCurrentStatus}
          uploadedPhoto={uploadedPhoto}
          preset={preset}
          setUploadedPhoto={setUploadedPhoto}
        />
      </Flexbox>
    </Flexbox>
  );
}
