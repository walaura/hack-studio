import { TSetCurrentStatus } from "../components/PrevImages";
import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import { TPreset } from "./SelectPreset";
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import stylex from "@stylexjs/stylex";
import * as THREE from 'three'
import { useMaterials } from "../materials/useMaterials";
import Button from "../ui/Button";

const styles = stylex.create({
  canvas: {
    width: '100%',
    height: '100%',
  },
  sidebar: {
    border: '2px solid red',
    width: 300,
  }
});

export default function Home({
  uploadedPhoto,
  preset,
  setUploadedPhoto,
  setCurrentStatus,
}: {
  uploadedPhoto?: string;
  preset: TPreset;
  setUploadedPhoto: (image: string) => void;
  setCurrentStatus: TSetCurrentStatus;
}) {
  const { nodes, materials: rawMaterials } = useGLTF('./assets/untitled.glb')
  const { materials, updateMaterial, addMaterial, removeMaterial } = useMaterials();

  const red = new THREE.MeshLambertMaterial({ color: materials[0]?.color ?? 'yellow' })

  return (
    <Flexbox
      gap={12}
      direction="row"
      align="end"
      xstyle={styles.canvas}
    >
      <Canvas>
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 0, 5]} color="white" />
        <group dispose={null} scale={[.5, .5, .5]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={rawMaterials.Material}
            scale={[0.376, 1.746, 3.799]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={red}
            position={[0, 0, 1.843]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Sphere001.geometry}
            material={nodes.Sphere001.material}
            position={[0, 0, -1.932]}
          />
        </group>
        <OrbitControls />
      </Canvas>
      <Flexbox xstyle={styles.sidebar} direction="column">
        <Button onClick={() => {
          addMaterial({ color: '#ff0055' });
        }}>
          new
        </Button>
        {materials.map((material) => <Box key={material.id}>
          <input
            type="color"
            value={material.color}
            onChange={(e) => {
              updateMaterial(material.id, { color: e.target.value });
            }}
          />
          <Button onClick={() => {
            removeMaterial(material.id);
          }}>
            remove
          </Button>
        </Box>)}
        <pre> {JSON.stringify(materials, null, 2)}</pre>
      </Flexbox>
    </Flexbox >
  );
}
