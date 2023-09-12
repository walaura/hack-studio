import { useState } from "react";
import { css } from "@emotion/react";
import usePicks from "./usePicks";
import { TPreset } from "./SelectPreset";
import Flexbox from "../ui/Flexbox";

type TStage = {
  picks: {
    [key: string]: {
      key: string;
      rotation: number;
      isActive: boolean;
    };
  };
};

export default function Canvas({
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
    <>
      <div style={{ width: 500, height: 500, position: "absolute" }}>
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
        <Flexbox direction="column" gap={4}>
          {[0, 1, 2].map((stg) => (
            <button onClick={() => setActiveStage(stg)}>
              Stage {stg + 1} {activeStage === stg && "✅"}
            </button>
          ))}
        </Flexbox>
        <Flexbox direction="column" align='stretch' gap={4}>
          {Object.entries(picks).map(([key, pick]) => {
            const isInStage =
              stages[activeStage].picks[pick.key]?.isActive === true;
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
              <label
                css={css`
                  &:hover {
                    background: red;
                  }
                `}
              >
                <Flexbox gap={4}>
                  <span>{key}</span>
                  <input
                    checked={isInStage}
                    type="checkbox"
                    onChange={(ev) => {
                      setStages((stages) => {
                        if (stages[activeStage].picks[pick.key]) {
                          stages[activeStage].picks[pick.key] = {
                            ...stages[activeStage].picks[pick.key],
                            isActive:
                              !stages[activeStage].picks[pick.key].isActive,
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
                </Flexbox>
              </label>
            );
          })}
        </Flexbox>
      </div>
    </>
  );
}
