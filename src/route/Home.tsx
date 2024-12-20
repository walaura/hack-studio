import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import stylex from "@stylexjs/stylex";
import * as THREE from "three";
import { useMaterials } from "../materials/useMaterials";
import Button from "../ui/Button";
import Text from "../ui/Text";
import {
  Groups,
  SurfaceID,
  useMaterialMap,
} from "../materials/useMaterialAssingments";
import { MaterialPicker } from "../materials/MaterialPicker";
import Margin from "../ui/Margin";

const styles = stylex.create({
  canvas: {
    width: "100%",
    height: "100%",
  },
  sidebar: {
    width: 500,
    height: "90%",
    alignSelf: "center",
  },
  innie: {
    overflow: "scroll",
  },
});

export default function Home({}: {}) {
  const { nodes } = useGLTF("./assets/untitled.glb");
  const {
    materials,
    pickMaterial,
    updateMaterial,
    addMaterial,
    removeMaterial,
  } = useMaterials();

  const { materialMap, assignMaterial, assignInheritance } = useMaterialMap();

  const red = new THREE.MeshLambertMaterial({
    color: pickMaterial(materialMap.BUTTON_A.material).color,
  });
  const b = new THREE.MeshLambertMaterial({
    color: pickMaterial(materialMap.BUTTON_B.material).color,
  });
  const shell = new THREE.MeshLambertMaterial({
    color: pickMaterial(materialMap.FRONT_SHELL.material).color,
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
      <Flexbox xstyle={styles.sidebar} direction="column">
        <Box elevation={0}>
          <Flexbox xstyle={[styles.innie, Margin.all20]} direction="column">
            <Text type="headline2">Assignments</Text>
            {Object.keys(materialMap).map((surfaceID: SurfaceID) => (
              <MaterialPicker
                key={surfaceID}
                surface={surfaceID}
                materials={materials}
                assignedMaterial={materialMap[surfaceID]}
                onPickInheritance={(id) => {
                  assignInheritance(surfaceID, id);
                }}
                onPickMaterial={(id) => {
                  assignMaterial(surfaceID, id);
                }}
              />
            ))}
            <pre style={{ fontSize: ".2em" }}>
              {JSON.stringify(materialMap, null, 2)}
            </pre>
          </Flexbox>
        </Box>
      </Flexbox>
      <Flexbox xstyle={styles.sidebar} direction="column">
        <Box>
          <Text type="headline2">Materials</Text>
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

export function InheritanceDropdown({
  selected,
  onSelect,
}: {
  selected?: SurfaceID;
  onSelect: (id: SurfaceID) => void;
}) {
  const groups = Object.keys(Groups);
  return (
    <select
      onChange={(e) => {
        if (e.target.value === "none") {
          onSelect(null);
          return;
        }
        onSelect(e.target.value as SurfaceID);
      }}
    >
      {groups.map((group) => (
        <option key={group} value={group} selected={selected === group}>
          {group}
        </option>
      ))}
      <option value="none" selected={!selected}>
        None
      </option>
    </select>
  );
}
