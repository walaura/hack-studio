import { css } from "@emotion/react";
import usePicks from "../usePicks";

export type TPreset = { name: string; uiSpaceTop: number };

const PRESETS = [
  { name: "basic", uiSpaceTop: 500 },
  { name: "mid", uiSpaceTop: 458 },
  { name: "adv", uiSpaceTop: 408 },
];

const PickWithPreset = ({
  fromImage,
  preset,
}: {
  fromImage: string;
  preset: TPreset;
}) => {
  const [picks, target] = usePicks({ fromImage, preset });

  return (
    <>
      {preset.name} -{" "}
      {Object.values(picks).map((pick) => (
        <img
          css={css`
            width: 80px;
            height: 80px;
            border-radius: 2px;
          `}
          src={pick.img}
        />
      ))}
    </>
  );
};

export default function SelectPreset({
  fromImage,
  onSelect,
}: {
  fromImage: string;
  onSelect: (TPreset) => void;
}) {
  return (
    <>
      <h2>What looks best?</h2>
      {PRESETS.map((preset) => (
        <button onClick={() => onSelect(preset)}>
          <PickWithPreset fromImage={fromImage} preset={preset} />
        </button>
      ))}
    </>
  );
}
