import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stage } from "@react-three/drei";

import { GBA } from "./models/Gba";
import { ModelProps } from "./types";

function Model(props: ModelProps) {
  return (
    <>
      <Stage environment={"forest"} preset={"soft"} position={[0, 2, 0]}>
        <Float
          speed={1}
          rotationIntensity={1}
          floatIntensity={1}
          floatingRange={[0, 0.2]}
        >
          <GBA {...props} />
        </Float>
      </Stage>
    </>
  );
}

export default function Scene(props: ModelProps) {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <OrbitControls />
      <Model {...props} />
    </Canvas>
  );
}
