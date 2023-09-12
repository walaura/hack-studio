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
            var file = ev.target.files[0];
            var fr = new FileReader();
            fr.onload = () => {
              const img = new Image();
              img.onload = () => {
                setUploadedPhoto(img.src);
              };
              if (typeof fr.result == "string") {
                img.src = fr.result;
              }
            };
            fr.readAsDataURL(file); // begin reading
          }}
        />
        {uploadedPhoto && (
          <button onClick={() => setUploadedPhoto(null)}>Clear</button>
        )}
      </div>
      {uploadedPhoto && <Canvas fromImage={uploadedPhoto} />}
    </>
  );
}
