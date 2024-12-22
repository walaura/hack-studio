import Box from "../../ui/Box";
import Flexbox from "../../ui/Flexbox";
import stylex from "@stylexjs/stylex";
import useMaterials from "../../materials/useMaterials";
import Button from "../../ui/Button";
import Text from "../../ui/Text";
import MaterialPanel from "./HomeSidebar";
import Scene from "../../scene/Scene";
import MaterialEditor from "../../materials/MaterialEditor";
import { useWriteToStore } from "../../store/useStore";

const styles = stylex.create({
  canvas: {
    width: "100%",
    height: "100%",
  },
  sidebar: {
    width: 480,
    height: "calc(100vh - 16px - 16px)",
    marginRight: 16,
    alignSelf: "center",
    flexShrink: 0,
  },
});

export default function Home() {
  const { materials, pickMaterial } = useMaterials();
  const { addMaterial } = useWriteToStore();

  return (
    <Flexbox direction="row" align="end" xstyle={styles.canvas}>
      <Scene pickMaterial={pickMaterial} />
      <Flexbox xstyle={styles.sidebar} direction="column">
        <MaterialPanel
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
                <MaterialEditor key={material.id} materialKey={material.id} />
              ))}
              <pre>{JSON.stringify(materials, null, 2)}</pre>
            </Box>
          }
        />
      </Flexbox>
    </Flexbox>
  );
}
