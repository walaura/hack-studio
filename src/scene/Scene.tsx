import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Material, MaterialID } from "../materials/useMaterials";
import { MaterialMap } from "../materials/useMaterialAssignments";

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

  const { nodes } = useGLTF("./assets/untitled.glb");

  return (
    <Canvas>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 0, 5]} color="white" />
      <group scale={[0.5, 0.5, 0.5]}>
        <mesh
          castShadow
          receiveShadow
          /* @ts-ignore */
          geometry={nodes.Cube.geometry}
          material={shell}
          scale={[0.376, 1.746, 3.799]}
        />
        <mesh
          castShadow
          receiveShadow
          /* @ts-ignore */
          geometry={nodes.Sphere.geometry}
          material={red}
          position={[0, 0, 1.843]}
        />
        <mesh
          castShadow
          receiveShadow
          /* @ts-ignore */
          geometry={nodes.Sphere001.geometry}
          material={b}
          position={[0, 0, -1.932]}
        />
      </group>
      <OrbitControls />
    </Canvas>
  );
}
