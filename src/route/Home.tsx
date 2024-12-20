import Box from "../ui/Box";
import Flexbox from "../ui/Flexbox";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import stylex from "@stylexjs/stylex";
import * as THREE from "three";
import { Material, MaterialID, useMaterials } from "../materials/useMaterials";
import Button from "../ui/Button";
import Text from "../ui/Text";
import {
  MaterialMap,
  useMaterialAssignments,
} from "../materials/useMaterialAssignments";
import MaterialPanel from "../materials/MaterialPanel";
import Scene from "../scene/Scene";

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
  const {
    materials,
    pickMaterial,
    updateMaterial,
    addMaterial,
    removeMaterial,
  } = useMaterials();

  const { materialMap, assignMaterial, assignInheritance } =
    useMaterialAssignments();

  return (
    <Flexbox gap={12} direction="row" align="end" xstyle={styles.canvas}>
      <Scene pickMaterial={pickMaterial} materialMap={materialMap} />
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
