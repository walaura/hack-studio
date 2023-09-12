import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import Title from "../ui/Title";

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export default function Upload({
  uploadedPhoto,
  setUploadedPhoto,
}: {
  uploadedPhoto?: string;
  setUploadedPhoto: (url: string) => void;
}) {
  return (
    <>
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
        <Flexbox gap={12} direction="column">
          <Title>Upload screenshot</Title>
          <input
            type="file"
            onChange={async (ev) => {
              URL.revokeObjectURL(uploadedPhoto);
              const b64Image = await blobToBase64(ev.target.files[0]);
              setUploadedPhoto(b64Image);
            }}
          />
        </Flexbox>
      </Box>
    </>
  );
}
