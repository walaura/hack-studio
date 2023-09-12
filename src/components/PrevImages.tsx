import { css } from "@emotion/react";
import Box from "../ui/Box";
import Title from "../ui/Title";
import { TPrevImages } from "../route/Upload";

export type TSetCurrentStatus = ({ image, preset }: TPrevImages) => void;

export const PrevImages = ({
  prevImages,
  setCurrentStatus,
}: {
  prevImages: TPrevImages[];
  setCurrentStatus: TSetCurrentStatus;
}) => {
  return prevImages.length ? (
    <Box>
      <Title>Previous images</Title>
      <div
        css={css`
          display: flex;
          align-items: center;
          overflow: auto;
          gap: 20px;
          margin-top: 20px;
        `}
      >
        {prevImages.map((prevImage, i) => (
          <button
            key={i}
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
                width: 10em;
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
