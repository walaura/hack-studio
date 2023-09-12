import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import Title from "../ui/Title";

export default function Upload({
  uploadedPhoto,
  setUploadedPhoto,
}: {
  uploadedPhoto?: string;
  setUploadedPhoto: (string) => void;
}) {
  return (
    <Flexbox gap={12} direction="column">
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
        <Title>Upload screenshot</Title>
        <input
          type="file"
          onChange={(ev) => {
            URL.revokeObjectURL(uploadedPhoto);
            const url = URL.createObjectURL(ev.target.files[0]);
            setUploadedPhoto(url);
          }}
        />
        {uploadedPhoto && (
          <button
            onClick={() => {
              setUploadedPhoto(null);
            }}
          >
            Clear
          </button>
        )}
      </Box>
    </Flexbox>
  );
}
