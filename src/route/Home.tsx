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
import { useMaterialAssignments } from "../materials/useMaterialAssignments";
import MaterialPanel from "../materials/MaterialPanel";

const styles = stylex.create({
  canvas: {
    width: "100%",
    height: "100%",
  },
  sidebar: {
    width: "50em",
    height: "calc(100vh - 4em)",
    marginRight: "4em",
    alignSelf: "center",
    flexShrink: 0,
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

  const { materialMap, assignMaterial, assignInheritance } =
    useMaterialAssignments();

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
        <MaterialPanel
          materialMap={materialMap}
          materials={materials}
          assignInheritance={assignInheritance}
          assignMaterial={assignMaterial}
          materialEditor={
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
          }
        />
      </Flexbox>
    </Flexbox>
  );
}
