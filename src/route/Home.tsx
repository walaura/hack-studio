import { TSetCurrentStatus } from "../components/PrevImages";
import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import stylex from "@stylexjs/stylex";
import * as THREE from "three";
import { Material, MaterialID, useMaterials } from "../materials/useMaterials";
import Button from "../ui/Button";
import Title from "../ui/Title";
import {
  MaterialAssignment,
  SurfaceID,
  useMaterialMap,
} from "../materials/useMaterialMap";
import Swatch from "../ui/Swatch";

const styles = stylex.create({
  canvas: {
    width: "100%",
    height: "100%",
  },
  sidebar: {
    width: 300,
  },
});

export default function Home({}: {}) {
  const { nodes, materials: rawMaterials } = useGLTF("./assets/untitled.glb");
  const {
    materials,
    pickMaterial,
    updateMaterial,
    addMaterial,
    removeMaterial,
  } = useMaterials();

  const { materialMap, assignMaterial } = useMaterialMap();

  const red = new THREE.MeshLambertMaterial({
    color: pickMaterial(materialMap.BUTTON_A.material).color,
  });
  const b = new THREE.MeshLambertMaterial({
    color: pickMaterial(materialMap.BUTTON_B.material).color,
  });

  return (
    <Flexbox gap={12} direction="row" align="end" xstyle={styles.canvas}>
      <Canvas>
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 0, 5]} color="white" />
        <group scale={[0.5, 0.5, 0.5]}>
          <mesh
            castShadow
            receiveShadow
            /* @ts-ignore */
            geometry={nodes.Cube.geometry}
            material={rawMaterials.Material}
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
      <Flexbox xstyle={styles.sidebar} direction="column">
        <Box>
          <Title>Assignments</Title>
          {Object.keys(materialMap).map((surfaceID: SurfaceID) => (
            <Box key={surfaceID}>
              {surfaceID}
              <MaterialPicker
                materials={materials}
                assignedMaterial={materialMap[surfaceID]}
                onPickMaterial={(id) => {
                  assignMaterial(surfaceID, id);
                }}
              />
            </Box>
          ))}
          <pre style={{ fontSize: ".2em" }}>
            {JSON.stringify(materialMap, null, 2)}
          </pre>
        </Box>
      </Flexbox>
      <Flexbox xstyle={styles.sidebar} direction="column">
        <Box>
          <Title>Materials</Title>
          <Button
            onClick={() => {
              addMaterial({ color: "#ff0055" });
            }}
          >
            new
          </Button>
          {materials.map((material) => (
            <Box key={material.id}>
              <input
                type="color"
                value={material.color}
                onChange={(e) => {
                  updateMaterial(material.id, { color: e.target.value });
                }}
              />
              <Button
                onClick={() => {
                  removeMaterial(material.id);
                }}
              >
                remove
              </Button>
            </Box>
          ))}
          <pre> {JSON.stringify(materials, null, 2)}</pre>
        </Box>
      </Flexbox>
    </Flexbox>
  );
}

function MaterialPicker({
  materials,
  assignedMaterial,
  onPickMaterial,
}: {
  materials: Material[];
  assignedMaterial: MaterialAssignment;
  onPickMaterial: (id: MaterialID) => void;
}) {
  return (
    <Flexbox direction="row" gap={4}>
      {assignedMaterial.type === "inherit" ? (
        <>Inheriting from {assignedMaterial.from}</>
      ) : (
        "raw"
      )}
      {materials.map((material) => (
        <Swatch
          color={material.color}
          key={material.id}
          isActive={assignedMaterial.material === material.id}
          onClick={() => {
            onPickMaterial(material.id);
          }}
        ></Swatch>
      ))}
    </Flexbox>
  );
}
