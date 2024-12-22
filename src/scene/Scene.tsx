import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stage } from "@react-three/drei";

import { GBA } from "./models/Gba";
import { SP } from "./models/SP";
import { ModelProps } from "./types";
import useProject from "../project/useProject";
import { useMemo } from "react";
import { GB } from "./models/GB";

function Model(props: ModelProps) {
  const { type } = useProject();
  const Component = useMemo(() => {
    switch (type) {
      case "GBA":
        return GBA;
      case "GBA_SP":
        return SP;
      case "GB":
        return GB;
    }
  }, [type]);
  return (
    <>
      <Stage
        environment={"forest"}
        preset={"soft"}
        key={type}
        adjustCamera={type !== "GBA_SP"}
        center={{
          disable: type !== "GBA_SP",
        }}
      >
        <Component {...props} />
      </Stage>
    </>
  );
}

export default function Scene(props: ModelProps) {
  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 35,
      }}
    >
      <OrbitControls />
      <Float
        speed={1}
        rotationIntensity={1}
        floatIntensity={1}
        floatingRange={[0, 0.2]}
      >
        <Model {...props} />
      </Float>
    </Canvas>
  );
}
