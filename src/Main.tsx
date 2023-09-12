import React, { useState } from "react";
import Canvas from "./Canvas";

export default function Main() {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

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
            const url = URL.createObjectURL(ev.target.files[0]);
            setUploadedPhoto(url);
          }}
        />
        {uploadedPhoto && (
          <button onClick={() => setUploadedPhoto(null)}>Clear</button>
        )}
      </div>
      <Canvas fromImage={uploadedPhoto ?? ""} />
    </>
  );
}
