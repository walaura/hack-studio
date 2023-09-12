import { useState } from "react";
import { css } from "@emotion/react";
import usePicks, { TPick } from "../component/usePicks";
import { TPreset } from "./SelectPreset";
import Flexbox from "../ui/Flexbox";
import Box from "../ui/Box";

type TPickInStage = { key: string; rotation: number; isActive: boolean };

type TStage = {
  picks: {
    [key: string]: TPickInStage;
  };
};

export default function Picking({
  fromImage,
  preset,
}: {
  preset: TPreset;
  fromImage: string;
}) {
  const [stages, setStages] = useState<TStage[]>([
    { picks: {} },
    { picks: {} },
    { picks: {} },
  ]);
  const [activeStage, setActiveStage] = useState(0);
  const [picks, target] = usePicks({ fromImage, preset });

  return (
    <Flexbox
      gap={4}
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <Flexbox
        align="center"
        justify="center"
        css={css`
          position: relative;
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: 0;
        `}
      >
        <Box noPadding>
          <div
            css={css`
              width: 32em;
              height: 32em;
              position: relative;
            `}
          >
            <img
              src={target}
              style={{ position: "absolute", width: "100%", height: "100%" }}
            />
            {Object.values(stages[activeStage].picks)
              .filter((pick) => pick.isActive)
              .map((pick) => (
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
        </Box>
      </Flexbox>
      <Flexbox
        gap={12}
        align="start"
        justify="start"
        css={css`
          height: 100%;
          width: 30em;
        `}
      >
        <Flexbox
          direction="column"
          gap={4}
          css={css`
            margin-top: 12px;
          `}
        >
          {[0, 1, 2].map((stg) => (
            <button onClick={() => setActiveStage(stg)}>
              #{stg + 1}
              {activeStage === stg && "✅"}
            </button>
          ))}
        </Flexbox>
        <div
          css={css`
            height: 100%;
            padding: 12px;
            flex-grow: 1;
          `}
        >
          <Box
            css={css`
              height: 100%;
            `}
          >
            <Flexbox direction="column" align="stretch" gap={4}>
              {Object.entries(picks).map(([key, pick]) => {
                return (
                  <Label
                    pickInStage={stages[activeStage].picks[pick.key]}
                    stages={stages}
                    pick={pick}
                    onRotate={(rotation) => {
                      setStages((stages) => {
                        if (stages[activeStage].picks[pick.key] == null) {
                          return [...stages];
                        }

                        stages[activeStage].picks[pick.key] = {
                          ...stages[activeStage].picks[pick.key],
                          rotation,
                        };

                        return [...stages];
                      });
                    }}
                    onSelect={(isActive) => {
                      setStages((stages) => {
                        if (stages[activeStage].picks[pick.key]) {
                          stages[activeStage].picks[pick.key] = {
                            ...stages[activeStage].picks[pick.key],
                            isActive,
                          };
                          return [...stages];
                        }

                        stages[activeStage].picks[pick.key] = {
                          key: pick.key,
                          rotation: 0,
                          isActive: true,
                        };

                        return [...stages];
                      });
                    }}
                  />
                );
              })}
            </Flexbox>
          </Box>
        </div>
      </Flexbox>
    </Flexbox>
  );
}

function Label({
  pick,
  pickInStage,
  stages,
  onSelect,
  onRotate,
}: {
  pick: TPick;
  pickInStage: TPickInStage | null;
  stages: TStage[];

  onSelect: (boolean) => void;
  onRotate: (number) => void;
}) {
  const { key } = pick;
  const isInStage = pickInStage?.isActive === true;
  const isInStages = stages
    .map((stage, stageKey) =>
      Object.values(stage.picks).find(
        (pick) => pick.key === key && pick.isActive
      )
        ? stageKey + 1
        : null
    )
    .filter(Boolean);

  return (
    <label>
      <Flexbox gap={4} justify="stretch" align="center">
        <span>{key}</span>
        <input
          checked={isInStage}
          type="checkbox"
          onChange={() => {
            onSelect(!(pickInStage?.isActive ?? true));
          }}
        />

        <img
          css={css`
            width: 80px;
            height: 80px;
            border-radius: 2px;
          `}
          src={pick.img}
        />
        <input
          onChange={(ev) => {
            onRotate(parseInt(ev.target.value, 10));
          }}
          disabled={!isInStage}
          type="range"
          value={pickInStage?.rotation ?? 0}
          min={0}
          max={360}
        />
        {isInStages}
      </Flexbox>
    </label>
  );
}
