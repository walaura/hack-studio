/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import { GBType, ModelProps } from "../types";
import {
  createBezelMaterial,
  createButtonsMaterial,
  createHardPlasticMaterial,
  lightMaterial,
  membranesMaterial,
  metalMaterial,
} from "../materials";
import useAssignment from "../../assignments/useAssignment";
import { Assignment } from "../../assignments/Assignments";
import { MeshPhysicalMaterial } from "three";

export function GB({ pickMaterial }: ModelProps) {
  const { nodes } = useGLTF("./assets/gb.glb") as GBType;
  const colorMap = useVideoTexture("./assets/bootgb.mp4", { loop: false });

  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DPAD.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.DPAD).material).color
        )}
        position={[-0.841, -0.9, 1.116]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlugIn.geometry}
        material={nodes.PlugIn.material}
        position={[1.456, 1.565, 0.509]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Volume.geometry}
        material={nodes.Volume.material}
        position={[1.425, 0.835, 0.552]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ButtonA.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.BUTTON_A).material).color
        )}
        position={[0.638, -0.973, 1.129]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BatteryClip.geometry}
        material={createHardPlasticMaterial(
          pickMaterial(useAssignment(Assignment.BACK_SHELL).material)
        )}
        position={[0.05, -0.185, 0.113]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PowerSwitch.geometry}
        material={createHardPlasticMaterial(
          pickMaterial(useAssignment(Assignment.BACK_SHELL).material)
        )}
        position={[-1.069, 2.474, 0.583]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ButtonSelect.geometry}
        material={membranesMaterial(
          useAssignment(Assignment.MEMBRANE_START_SELECT).material
        )}
        position={[-0.112, -1.633, 1.08]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.HeadphoneBorder.geometry}
        material={nodes.HeadphoneBorder.material}
        position={[-1.394, 1.664, 0.439]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Brightness.geometry}
        material={nodes.Brightness.material}
        position={[-1.308, 0.978, 0.731]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.plugOut.geometry}
        material={nodes.plugOut.material}
        position={[1.441, 1.603, 0.53]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Screws.geometry}
        material={
          new THREE.MeshPhysicalMaterial({
            color: "black",
            metalness: 1,
            roughness: 0.06,
          })
        }
        position={[0.052, 1.058, 0.329]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ButtonB.geometry}
        material={createButtonsMaterial(
          pickMaterial(useAssignment(Assignment.BUTTON_B).material).color
        )}
        position={[1.14, -0.733, 1.129]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Charger.geometry}
        material={nodes.Charger.material}
        position={[0.06, -2.459, 0.75]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Vent.geometry}
        material={createHardPlasticMaterial(
          pickMaterial(useAssignment(Assignment.FRONT_SHELL).material)
        )}
        position={[0.94, -2.066, 0.977]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Back.geometry}
        material={createHardPlasticMaterial(
          pickMaterial(useAssignment(Assignment.BACK_SHELL).material)
        )}
        position={[0.035, -0.523, 0.241]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.HeadphonePin.geometry}
        material={metalMaterial}
        position={[-1.399, 1.663, 0.439]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ChargerPin.geometry}
        material={metalMaterial}
        position={[0.06, -2.446, 0.749]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.low_Screen.geometry}
        material={
          new THREE.MeshPhysicalMaterial({
            map: colorMap,
            emissiveMap: colorMap,
            emissive: "green",
            emissiveIntensity: 1.5,
            side: THREE.DoubleSide,
          })
        }
        rotation={[Math.PI, 0, 0]}
        position={[0.042, 1.112, 1.076]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.front.geometry}
        material={createHardPlasticMaterial(
          pickMaterial(useAssignment(Assignment.FRONT_SHELL).material)
        )}
        position={[0.218, -0.761, 0.97]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlugInMetal.geometry}
        material={metalMaterial}
        position={[1.432, 1.567, 0.533]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bezel.geometry}
        material={createBezelMaterial("dark")}
        position={[-0.006, 1.094, 1.099]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.light.geometry}
        material={lightMaterial}
        position={[-1.049, 1.309, 1.1]}
      />
    </group>
  );
}

useGLTF.preload("./assets/gb.glb");
