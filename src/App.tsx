import React, { useState } from "react";
import Canvas from "./component/Canvas";
import SelectPreset from "./component/SelectPreset";
import Box from "./ui/Box";
import Title from "./ui/Title";

export default function App() {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [preset, setPreset] = useState(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          position: "fixed",
          bottom: 0,
          left: 0,
          padding: 12,
        }}
      >
        <Box>
          <Title>Upload screenshot</Title>
          <input
            type="file"
            onChange={(ev) => {
              URL.revokeObjectURL(uploadedPhoto);
              setPreset(null);
              const url = URL.createObjectURL(ev.target.files[0]);
              setUploadedPhoto(url);
            }}
          />
          {uploadedPhoto && (
            <button
              onClick={() => {
                setUploadedPhoto(null);
                setPreset(null);
              }}
            >
              Clear
            </button>
          )}
        </Box>
      </div>
      {uploadedPhoto && !preset && (
        <SelectPreset onSelect={setPreset} fromImage={uploadedPhoto} />
      )}
      {uploadedPhoto && preset && (
        <Canvas preset={preset} fromImage={uploadedPhoto} />
      )}
    </>
  );
}
