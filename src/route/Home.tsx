import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import Title from "../ui/Title";
import Upload from "./Upload";
import logo from "../../static/logo.webp";
import { css } from "@emotion/react";

export default function Home({
  uploadedPhoto,
  setUploadedPhoto,
}: {
  uploadedPhoto?: string;
  setUploadedPhoto: (string) => void;
}) {
  return (
    <Flexbox
      gap={12}
      direction="row"
      align="end"
      css={css`
        max-width: 60vw;
      `}
    >
      <div
        css={css`
          max-width: 40em;
          width: 100%;
          flex-grow: 1;
          flex-shrink: 1;
        `}
      >
        <img
          src={logo}
          css={css`
            width: 100%;
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
        <Box>
          <Upload
            uploadedPhoto={uploadedPhoto}
            setUploadedPhoto={setUploadedPhoto}
          />
        </Box>
      </Flexbox>
    </Flexbox>
  );
}
