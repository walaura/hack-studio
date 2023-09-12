import React, { useRef, useEffect, useState } from "react";
import { css } from "@emotion/react";

const UI_SPACE_X = 1353;
const UI_SPACE_Y = 458;
const X_SPACE = 8;
const Y_SPACE = 5;
const PICKS = 9;

const X_TARGET = 684;
const Y_TARGET = 264;
const SIZE_TARGET = 552;

type Pick = {
  key: string;
  img: string;
  pos: [number, number];
};

type TStage = {
  picks: {
    [key: string]: {
      key: string;
      rotation: number;
    };
  };
};

export default function Canvas({ fromImage }: { fromImage: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef(null);
  const [picks, setPicks] = useState<{ [key: string]: Pick }>({});
  const [target, setTarget] = useState<string>(null);
  const [stages, setStages] = useState<TStage[]>([
    { picks: {} },
    { picks: {} },
    { picks: {} },
  ]);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const image = imageRef.current;

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
          canvasRef.current,
          UI_SPACE_X * -1 - leftOffset,
          UI_SPACE_Y * -1 - topOffset
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

      tCtx.drawImage(canvasRef.current, -X_TARGET, -Y_TARGET);

      const img = tempCanvas.toDataURL("image/png");
      setTarget(img);
    });
  }, [fromImage]);

  return (
    <>
      <div style={{ width: 500, height: 500, position: "absolute" }}>
        <img
          src={target}
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
        {Object.values(stages[activeStage].picks).map((pick) => (
          <img
            style={{
              position: "absolute",
              mixBlendMode: "lighten",
              width: "100%",
              height: "100%",
              transform: `rotate(${pick.rotation}deg)`,
            }}
            src={picks[pick.key].img}
          />
        ))}
      </div>
      <div
        style={{
          width: 300,
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[0, 1, 2].map((stg) => (
            <button onClick={() => setActiveStage(stg)}>
              Stage {stg + 1} {activeStage === stg && "✅"}
            </button>
          ))}
        </div>
        {Object.entries(picks).map(([key, pick]) => {
          const isInStage = stages[activeStage].picks[pick.key] != null;
          const isInStages = stages
            .map((stage, stageKey) =>
              Object.keys(stage.picks).includes(key) ? stageKey + 1 : null
            )
            .filter(Boolean);

          return (
            <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span>{key}</span>
              <input
                checked={isInStage}
                type="checkbox"
                onChange={(ev) => {
                  setStages((stages) => {
                    if (stages[activeStage].picks[pick.key] != null) {
                      delete stages[activeStage].picks[pick.key];
                      return [...stages];
                    }

                    stages[activeStage].picks[pick.key] = {
                      key: pick.key,
                      rotation: 0,
                    };

                    return [...stages];
                  });
                }}
              />

              <img
                css={css`
                  width: 80px;
                  height: 80px;
                `}
                src={pick.img}
              />
              <input
                onChange={(ev) => {
                  setStages((stages) => {
                    if (stages[activeStage].picks[pick.key] == null) {
                      return [...stages];
                    }

                    stages[activeStage].picks[pick.key] = {
                      ...stages[activeStage].picks[pick.key],
                      rotation: parseInt(ev.target.value, 10),
                    };

                    return [...stages];
                  });
                }}
                disabled={!isInStage}
                type="range"
                value={stages[activeStage].picks[pick.key]?.rotation ?? 0}
                min={0}
                max={360}
              />
              {isInStages}
            </label>
          );
        })}
      </div>

      <canvas
        style={{ display: "none" }}
        width="1920"
        height="1080"
        ref={canvasRef}
      />
      <img style={{ display: "none" }} src={fromImage} ref={imageRef}></img>
    </>
  );
}
