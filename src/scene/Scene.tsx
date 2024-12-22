import { Canvas } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Stage,
  useGLTF,
  useVideoTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Material, MaterialKey } from "../materials/useMaterials";
import useAssignment from "../assignments/useAssignment";
import { MeshPhysicalMaterial } from "three";
import { GBAType } from "./types";
import {
  createBezelMaterial,
  createButtonsMaterial,
  createHardPlasticMaterial,
  membranesMaterial,
} from "./materials";
import { Assignment } from "../assignments/Assignments";

/* eslint-disable react/no-unknown-property */

function Gba({
  pickMaterial,
}: {
  pickMaterial: (id: MaterialKey) => Material;
}) {
  const { nodes, materials } = useGLTF("./assets/gba.glb") as GBAType;
  const colorMap = useVideoTexture("./assets/boot.mp4", { loop: false });

  return (
    <>
      <Stage environment={"forest"} preset={"soft"} position={[0, 2, 0]}>
        <Float
          speed={1}
          rotationIntensity={1}
          floatIntensity={1}
          floatingRange={[0, 0.2]}
        >
          <group
            dispose={null}
            scale={[2, 2, 2]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.back.geometry}
              material={createHardPlasticMaterial(
                pickMaterial(useAssignment(Assignment.BACK_SHELL).material)
              )}
              position={[0.042, 0.087, -0.11]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Front.geometry}
              material={createHardPlasticMaterial(
                pickMaterial(useAssignment(Assignment.FRONT_SHELL).material)
              )}
              position={[0.143, 0.023, -0.156]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.A.geometry}
              material={createButtonsMaterial(
                pickMaterial(useAssignment(Assignment.BUTTON_A).material).color
              )}
              position={[0.156, 0.097, -0.408]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.B.geometry}
              material={createButtonsMaterial(
                pickMaterial(useAssignment(Assignment.BUTTON_B).material).color
              )}
              position={[0.156, 0.136, -0.52]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.R.geometry}
              material={createButtonsMaterial(
                pickMaterial(useAssignment(Assignment.SHOULDER_R).material)
                  .color
              )}
              position={[0.077, 0.338, -0.47]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.L.geometry}
              material={createButtonsMaterial(
                pickMaterial(useAssignment(Assignment.SHOULDER_L).material)
                  .color
              )}
              position={[0.077, 0.338, 0.47]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.DPAD.geometry}
              material={createButtonsMaterial(
                pickMaterial(useAssignment(Assignment.DPAD).material).color
              )}
              position={[0.17, 0.107, 0.46]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.select.geometry}
              material={membranesMaterial(
                pickMaterial(
                  useAssignment(Assignment.MEMBRANE_START_SELECT).material
                ).color
              )}
              position={[0.158, -0.102, 0.376]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.bezel.geometry}
              material={createBezelMaterial("dark")}
              position={[0.151, 0.076, 0.006]}
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
              rotation={[0, 0, Math.PI]}
              scale={1.2}
              position={[0.157, 0.099, 0]}
            />

            <mesh
              castShadow
              receiveShadow
              geometry={nodes.RSide.geometry}
              material={createButtonsMaterial(
                pickMaterial(useAssignment(Assignment.RAIL_R).material).color
              )}
              position={[0.103, -0.029, -0.597]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.LSide.geometry}
              material={createButtonsMaterial(
                pickMaterial(useAssignment(Assignment.RAIL_L).material).color
              )}
              position={[0.103, -0.029, 0.597]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.battery.geometry}
              material={createHardPlasticMaterial(
                pickMaterial(useAssignment(Assignment.BACK_SHELL).material)
              )}
              position={[-0.057, -0.084, -0.004]}
            />

            <mesh
              castShadow
              receiveShadow
              geometry={nodes.memebrane_dpAD.geometry}
              material={membranesMaterial(
                pickMaterial(
                  useAssignment(Assignment.MEMBRANE_START_SELECT).material
                ).color
              )}
              position={[0.108, 0.106, 0.463]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={0.101}
            />
            <NutsAndBolts nodes={nodes} materials={materials} />
          </group>
        </Float>
      </Stage>
    </>
  );
}

export default function Scene({
  pickMaterial,
}: {
  pickMaterial: (id: MaterialKey) => Material;
}) {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <Gba pickMaterial={pickMaterial} />
    </Canvas>
  );
}

const NutsAndBolts = ({
  nodes,
  materials,
}: {
  nodes: GBAType["nodes"];
  materials: GBAType["materials"];
}) => {
  return (
    <>
      <OrbitControls />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CAPACITOR.geometry}
        material={materials["Material.003"]}
        position={[0.069, -0.108, 0.509]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[0.034, 0.017, 0.034]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.screws.geometry}
        material={
          new MeshPhysicalMaterial({
            color: "black",
            metalness: 1,
            roughness: 0.06,
          })
        }
        position={[0.001, 0.132, -0.002]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.light.geometry}
        material={
          new THREE.MeshPhysicalMaterial({
            roughness: 0.4,
            transmission: 10,
            thickness: 1,
            color: "green",
            emissive: "green",
          })
        }
        position={[0.042, 0.087, -0.11]}
      />
      <group position={[0.054, 0.067, -0.008]} scale={[0.453, 0.453, 0.661]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007_1.geometry}
          material={nodes.Plane007_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007_2.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane007_3.geometry}
          material={materials["Material.005"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.speaker.geometry}
        material={materials["Material.003"]}
        position={[0.057, -0.101, -0.45]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.104}
      />
    </>
  );
};
