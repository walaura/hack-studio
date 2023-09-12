import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import Title from "../ui/Title";
import Picking from "./Picking";

export default function Upload({
  uploadedPhoto,
  setUploadedPhoto,
}: {
  uploadedPhoto?: string;
  setUploadedPhoto: (string) => void;
}) {
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
        <Upload uploadedPhoto={uploadedPhoto} setUploadedPhoto={setUploadedPhoto} />
      </Box>
    </Flexbox>
  );
}
