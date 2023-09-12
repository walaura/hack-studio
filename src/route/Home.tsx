import { TSetCurrentStatus } from "../components/PrevImages";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import Title from "../ui/Title";
import { TPreset } from "./SelectPreset";
import Upload from "./Upload";

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
  const prevImages = useLocalStorage({ preset, uploadedPhoto });
  return (
    <Flexbox gap={12} direction="row">
      <Box>
        <Flexbox gap={12} direction="column">
          <Title>Digipick helper</Title>
          <p>
            Upload a screenshot from your hacking minigame. This tool will let
            you try to arrange all the picks as many times as you want, and then
            you can just punch them into your game.
          </p>
          <p>16:9, any resolution, pc or xbox</p>
        </Flexbox>
      </Box>
      <Box>
        <Upload
          setCurrentStatus={setCurrentStatus}
          uploadedPhoto={uploadedPhoto}
          prevImages={prevImages}
          setUploadedPhoto={setUploadedPhoto}
        />
      </Box>
    </Flexbox>
  );
}
