/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stage } from "@react-three/drei";
import { GBA } from "./models/Gba";
import { SP } from "./models/SP";
import { ModelProps } from "./types";
import useProject from "../project/useProject";
import { Fragment, useMemo } from "react";
import { GB } from "./models/GB";
import { GBC } from "./models/GBC";

import { useGizmos } from "./useGizmos";
import { Gizmos } from "./Gizmo";
import { Euler } from "three";

function Model(props: ModelProps) {
  const { type } = useProject();
  const { cameraRotation } = useGizmos();
  const Component = useMemo(() => {
    switch (type) {
      case "GBA":
        return GBA;
      case "GBA_SP":
        return SP;
      case "GB":
        return GB;
      case "GBC":
        return GBC;
    }
  }, [type]);
  return (
    <>
      <Stage
        environment={"forest"}
        preset={"soft"}
        key={`${type}`}
        adjustCamera={type !== "GBA_SP"}
        center={{
          disable: type !== "GBA_SP",
        }}
      >
        <group rotation={cameraRotation().rotation as unknown as Euler}>
          <Component {...props} />
        </group>
      </Stage>
    </>
  );
}

export default function Scene(props: ModelProps) {
  const { float } = useGizmos();
  const Component = float ? Float : Fragment;
  return (
    <>
      <Gizmos />
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 35,
        }}
      >
        <OrbitControls />
        <Component
          {...(float
            ? {
                speed: 1,
                rotationIntensity: 1,
                floatIntensity: 1,
                floatingRange: [0, 0.2],
              }
            : {})}
        >
          <Model {...props} />
        </Component>
      </Canvas>
    </>
  );
}
