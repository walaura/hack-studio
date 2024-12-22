import Box from "../../ui/Box";
import Flexbox from "../../ui/Flexbox";
import stylex from "@stylexjs/stylex";
import useMaterials from "../../materials/useMaterials";
import MaterialPanel from "./HomeSidebar";
import Scene from "../../scene/Scene";
import MaterialEditor from "../../materials/MaterialEditor";

const styles = stylex.create({
  canvas: {
    width: "100%",
    height: "100%",
  },
  sidebar: {
    width: 460,
    overflow: "visible",
    height: "calc(100vh - 16px - 16px)",
    marginRight: 16,
    alignSelf: "center",
    flexShrink: 0,
  },
});

export default function Home() {
  const { materials, pickMaterial } = useMaterials();

  return (
    <Flexbox direction="row" align="end" xstyle={styles.canvas}>
      <Scene pickMaterial={pickMaterial} />
      <Flexbox xstyle={styles.sidebar} direction="column">
        <MaterialPanel
          materialEditor={
            <Box>
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
