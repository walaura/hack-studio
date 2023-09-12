import { useEffect, useState } from "react";
import { TPreset } from "./SelectPreset";

// make these (some?) configurable for diff difficulties
const UI_SPACE_X = 1353;
const UI_SPACE_Y = 458;
const X_SPACE = 9;
const Y_SPACE = 6;
const PICKS = 9;

const X_TARGET = 684;
const Y_TARGET = 264;
const SIZE_TARGET = 552;

export type Pick = {
  key: string;
  img: string;
  pos: [number, number];
};

export default function usePicks({
  fromImage,
  preset,
}: {
  fromImage: string;
  preset?: TPreset | null;
}): [{ [key: string]: Pick }, string] {
  const [picks, setPicks] = useState<{ [key: string]: Pick }>({});
  const [target, setTarget] = useState<string>(null);

  const uiSpaceTop = preset?.uiSpaceTop ?? UI_SPACE_Y;

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1920;
    canvas.height = 1080;

    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.addEventListener("load", () => {
      ctx.drawImage(image, 0, 0, 1920, 1080);

      for (let i = 0; i <= PICKS; i++) {
        const col = i % 4;
        const row = Math.floor(i / 4);

        const leftOffset = (X_SPACE + 104) * col;
        const topOffset = (Y_SPACE + 104) * row;

        const tempCanvas = document.createElement("canvas"),
          tCtx = tempCanvas.getContext("2d");

        tempCanvas.width = 104;
        tempCanvas.height = 104;

        tCtx.drawImage(
          canvas,
          UI_SPACE_X * -1 - leftOffset,
          uiSpaceTop * -1 - topOffset
        );

        const img = tempCanvas.toDataURL("image/png");
        setPicks((picks) => ({
          ...picks,
          [String(row) + "-" + String(col)]: {
            key: String(row) + "-" + String(col),
            img,
            pos: [row, col],
          },
        }));
      }

      const tempCanvas = document.createElement("canvas"),
        tCtx = tempCanvas.getContext("2d");

      tempCanvas.width = SIZE_TARGET;
      tempCanvas.height = SIZE_TARGET;

      tCtx.drawImage(canvas, -X_TARGET, -Y_TARGET);

      const img = tempCanvas.toDataURL("image/png");
      setTarget(img);
    });
    image.src = fromImage;
  }, [fromImage, uiSpaceTop]);

  return [picks, target];
}
