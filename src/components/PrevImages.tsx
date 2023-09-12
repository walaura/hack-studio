import { css } from "@emotion/react";
import Box from "../ui/Box";
import Title from "../ui/Title";
import { TPreset } from "../route/SelectPreset";

export type TSetCurrentStatus = ({
  image,
  preset,
}: {
  image: string;
  preset: TPreset;
}) => void;

export const PrevImages = ({
  prevImages,
  setCurrentStatus,
}: {
  prevImages: any[];
  setCurrentStatus: TSetCurrentStatus;
}) => {
  return prevImages.length ? (
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
            onClick={() => setCurrentStatus(prevImage)}
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
  ) : null;
};
