import { css } from "@emotion/react";
import usePicks from "../hooks/usePicks";
import Box from "../ui/Box";
import Button from "../ui/Button";
import Flexbox from "../ui/Flexbox";
import Title from "../ui/Title";

export type TPreset = { name: string; uiSpaceTop: number; picksCount: number };

const PRESETS = [
  { name: "basic", uiSpaceTop: 500, picksCount: 4 },
  { name: "mid", uiSpaceTop: 458, picksCount: 8 },
  { name: "adv", uiSpaceTop: 408, picksCount: 12 },
];

const PickWithPreset = ({
  fromImage,
  preset,
}: {
  fromImage: string;
  preset: TPreset;
}) => {
  const [picks] = usePicks({ fromImage, preset });

  return (
    <Flexbox gap={12} direction="column" align="start">
      <Title style="light">{preset.name}</Title>
      <div
        css={css`
          margin: -4px;
          text-align: start;
        `}
      >
        {Object.values(picks).map((pick) => (
          <img
            css={css`
              width: 60px;
              height: 60px;
              border-radius: 2px;
              margin: 4px;
            `}
            src={pick.img}
          />
        ))}
      </div>
    </Flexbox>
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
    <Flexbox gap={12}>
      <div
        css={css`
          width: 18em;
        `}
      >
        <Box>
          <Flexbox gap={12} direction="column">
            <Title>What looks best?</Title>
            Pick the boxes where every square has a full circle inside, no
            crops. Some circles at the end might be empty!
          </Flexbox>
        </Box>
      </div>
      <div
        css={css`
          width: 50em;
        `}
      >
        <Flexbox gap={12} direction="column">
          {PRESETS.map((preset) => (
            <Button onClick={() => onSelect(preset)}>
              <PickWithPreset fromImage={fromImage} preset={preset} />
            </Button>
          ))}
        </Flexbox>
      </div>
    </Flexbox>
  );
}
