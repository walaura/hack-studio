import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stage, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Material, MaterialID } from "../materials/useMaterials";
import { MaterialMap } from "../materials/useMaterialAssignments";
import { MeshPhysicalMaterial } from "three";

const createBezelMaterial = (type: "dark" | "light") =>
  new THREE.MeshPhysicalMaterial({
    roughness: 0.1,
    thickness: 1,
    color: type === "dark" ? "black" : "white",
  });

const createPlasticMaterial = (color: string) =>
  new MeshPhysicalMaterial({
    color,
    roughness: 0.5,
    reflectivity: 0.8,
  });
const createButtonsMaterial = (color: string) =>
  new MeshPhysicalMaterial({
    color,
    roughness: 0.2,
    reflectivity: 1,
  });

const membranesMaterial = (color: string) =>
  new MeshPhysicalMaterial({
    color,
    roughness: 0.9,
  });

export default function Scene({
  pickMaterial,
  materialMap,
}: {
  pickMaterial: (id: MaterialID) => Material;
  materialMap: MaterialMap;
}) {
  const red = new THREE.MeshLambertMaterial({
    color: pickMaterial(materialMap.BUTTON_A.material).color,
  });
  const b = new THREE.MeshLambertMaterial({
    color: pickMaterial(materialMap.BUTTON_B.material).color,
  });
  const shell = new THREE.MeshLambertMaterial({
    color: pickMaterial(materialMap.FRONT_SHELL.material).color,
  });

  const { nodes } = useGLTF("./assets/gba.glb");

  return (
    <Canvas>
      <Stage environment={"forest"} preset={"soft"} position={[0, 2, 0]}>
        <Float
          speed={1} // Animation speed, defaults to 1
          rotationIntensity={1} // XYZ rotation intensity, defaults to 1
          floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[0, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <OrbitControls />
          <group
            dispose={null}
            scale={[2, 2, 2]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <mesh
              geometry={nodes.back.geometry}
              material={createPlasticMaterial(
                pickMaterial(materialMap.BACK_SHELL.material).color
              )}
              position={[0.042, 0.087, -0.11]}
            />
            <mesh
              geometry={nodes.Front.geometry}
              material={createPlasticMaterial(
                pickMaterial(materialMap.FRONT_SHELL.material).color
              )}
              position={[0.143, 0.023, -0.156]}
            />
            <mesh
              geometry={nodes.A.geometry}
              material={createButtonsMaterial(
                pickMaterial(materialMap.BUTTON_A.material).color
              )}
              position={[0.156, 0.097, -0.408]}
            />
            <mesh
              geometry={nodes.B.geometry}
              material={createButtonsMaterial(
                pickMaterial(materialMap.BUTTON_B.material).color
              )}
              position={[0.156, 0.136, -0.52]}
            />
            <mesh
              geometry={nodes.R.geometry}
              material={createButtonsMaterial(
                pickMaterial(materialMap.SHOULDER_R.material).color
              )}
              position={[0.077, 0.338, -0.47]}
            />
            <mesh
              geometry={nodes.L.geometry}
              material={createButtonsMaterial(
                pickMaterial(materialMap.SHOULDER_L.material).color
              )}
              position={[0.077, 0.338, 0.47]}
            />
            <mesh
              geometry={nodes.DPAD.geometry}
              material={createButtonsMaterial(
                pickMaterial(materialMap.DPAD.material).color
              )}
              position={[0.17, 0.107, 0.46]}
            />
            <mesh
              geometry={nodes.select.geometry}
              material={membranesMaterial(
                pickMaterial(materialMap.MEMBRANE_START_SELECT.material).color
              )}
              position={[0.158, -0.102, 0.376]}
            />
            <mesh
              geometry={nodes.bezel.geometry}
              material={createBezelMaterial("dark")}
              position={[0.151, 0.076, 0.006]}
            />
            <mesh
              geometry={nodes.screen.geometry}
              material={
                new THREE.MeshPhysicalMaterial({
                  roughness: 0.7,
                  transmission: 1,
                  thickness: 1,
                  color: "white",
                  emissive: "white",
                })
              }
              position={[0.157, 0.099, 0]}
            />
            <mesh
              geometry={nodes.RSide.geometry}
              material={createButtonsMaterial(
                pickMaterial(materialMap.RAIL_R.material).color
              )}
              position={[0.103, -0.029, -0.597]}
            />
            <mesh
              geometry={nodes.LSide.geometry}
              material={createButtonsMaterial(
                pickMaterial(materialMap.RAIL_L.material).color
              )}
              position={[0.103, -0.029, 0.597]}
            />
            <mesh
              geometry={nodes.battery.geometry}
              material={createPlasticMaterial(
                pickMaterial(materialMap.BACK_SHELL.material).color
              )}
              position={[-0.057, -0.084, -0.004]}
            />
            <mesh
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
          </group>
        </Float>
      </Stage>
    </Canvas>
  );
}
