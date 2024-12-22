/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import { ModelProps, SPTypes } from "../types";
import { createButtonsMaterial, membranesMaterial } from "../materials";
import useAssignment from "../../assignments/useAssignment";
import { Assignment } from "../../assignments/Assignments";
import { useSpring, animated } from "@react-spring/three";
import { useEffect, useState } from "react";

export function SP({ pickMaterial }: ModelProps) {
  const { nodes, materials } = useGLTF("./assets/sp.glb") as SPTypes;
  const colorMap = useVideoTexture("./assets/boot.mp4", { loop: false });
  const [loaded, setLoaded] = useState(false);
  const xAnimation = useSpring({
    x: [!loaded ? Math.PI / 1.56 : 0, 0, 0],
  });
  colorMap.flipY = true;
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.A.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.BUTTON_A).material).color
        )}
        position={[1.185, -0.74, 1.324]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.B.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.BUTTON_B).material).color
        )}
        position={[0.596, -0.738, 1.556]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.battery.geometry}
        material={nodes.battery.material}
        position={[-0.041, -1.212, 1.058]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bottom.geometry}
        material={nodes.bottom.material}
        position={[0.054, -1.031, 1.365]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dpad.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.DPAD).material).color
        )}
        position={[-0.968, -0.813, 1.443]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.io.geometry}
        material={nodes.io.material}
        position={[0.057, -1.084, 0.783]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.L.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.SHOULDER_L).material).color
        )}
        position={[-1.746, -1.042, -0.077]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lights.geometry}
        material={nodes.lights.material}
        position={[1.73, -0.832, 0.683]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.off.geometry}
        material={nodes.off.material}
        position={[-0.053, -0.81, 0.619]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.R.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.SHOULDER_R).material).color
        )}
        position={[1.661, -1.065, -0.086]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.select.geometry}
        material={membranesMaterial(
          pickMaterial(useAssignment(Assignment.MEMBRANE_START_SELECT).material)
            .color
        )}
        position={[-0.363, -0.803, 3.101]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.start.geometry}
        material={membranesMaterial(
          pickMaterial(useAssignment(Assignment.MEMBRANE_START_SELECT).material)
            .color
        )}
        position={[0.266, -0.803, 3.101]}
      />
      <animated.mesh
        castShadow
        receiveShadow
        geometry={nodes.top.geometry}
        material={nodes.top.material}
        position={[1.804, -0.615, -0.043]}
        rotation={xAnimation.x}
      >
        <group position={[-1.747, -0.469, 0.826]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube006.geometry}
            material={materials.Screen_Black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube006_1.geometry}
            material={materials.TEXT_White}
          />
        </group>
        <group position={[-1.747, -0.469, 0.826]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube019.geometry}
            material={materials.TEXT_White}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube019_1.geometry}
            material={materials.Black_TEXT_Background}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pads.geometry}
          material={nodes.pads.material}
          position={[-1.747, -0.469, 0.826]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.screen.geometry}
          material={
            new THREE.MeshPhysicalMaterial({
              map: colorMap,
              emissiveMap: colorMap,
              emissive: "white",
              emissiveIntensity: 1.5,
              side: THREE.DoubleSide,
            })
          }
          rotation={[Math.PI, 0, 0]}
          position={[-1.859, 1.861, -0.792]}
        />
      </animated.mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cartdrige.geometry}
        material={nodes.cartdrige.material}
        position={[0.072, -1.053, 0.769]}
      />
    </group>
  );
}

useGLTF.preload("./assets/sp.glb");
