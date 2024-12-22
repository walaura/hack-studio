/* eslint-disable react/no-unknown-property */
import { useGLTF, useVideoTexture } from "@react-three/drei";
import { GBCTypes, ModelProps } from "../types";
import * as THREE from "three";
import {
  createBezelMaterial,
  createButtonsMaterial,
  createHardPlasticMaterial,
  membranesMaterial,
  screwsMaterial,
} from "../materials";
import useAssignment from "../../assignments/useAssignment";
import { Assignment } from "../../assignments/Assignments";

export function GBC({ pickMaterial }: ModelProps) {
  const { nodes } = useGLTF("./assets/gbc.glb") as GBCTypes;
  const colorMap = useVideoTexture("./assets/boot.mp4", { loop: false });
  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.A.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.BUTTON_A).material).color
        )}
        position={[0.21, -0.098, 0.036]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.B.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.BUTTON_B).material).color
        )}
        position={[0.098, -0.13, 0.036]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.back.geometry}
        material={createHardPlasticMaterial(
          pickMaterial(useAssignment(Assignment.BACK_SHELL).material)
        )}
        position={[-0.045, -0.061, -0.076]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.battery.geometry}
        material={createHardPlasticMaterial(
          pickMaterial(useAssignment(Assignment.BACK_SHELL).material)
        )}
        position={[-0.005, -0.187, -0.169]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bezel.geometry}
        material={createBezelMaterial("dark")}
        position={[-0.012, 0.346, 0.017]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DPAD.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.DPAD).material).color
        )}
        position={[-0.176, -0.112, 0.035]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.front.geometry}
        material={createHardPlasticMaterial(
          pickMaterial(useAssignment(Assignment.FRONT_SHELL).material)
        )}
        position={[0.05, -0.024, 0.012]}
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
        position={[-0.001, 0.288, 0.019]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.screws.geometry}
        material={screwsMaterial}
        position={[0, 0.272, -0.09]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.select.geometry}
        material={membranesMaterial(
          pickMaterial(useAssignment(Assignment.MEMBRANE_START_SELECT).material)
            .color
        )}
        position={[-0.047, -0.283, 0.027]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.start.geometry}
        material={membranesMaterial(
          pickMaterial(useAssignment(Assignment.MEMBRANE_START_SELECT).material)
            .color
        )}
        position={[0.045, -0.284, 0.027]}
      />
    </group>
  );
}

useGLTF.preload("./assets/gbc.glb");
