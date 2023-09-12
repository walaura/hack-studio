import React, { useState } from "react";
import Canvas from "./Canvas";
import SelectPreset from "./component/SelectPreset";

export default function Main() {
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
        Upload screenshot
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
