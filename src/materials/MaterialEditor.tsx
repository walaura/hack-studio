import { useWriteToStore } from "../store/useStore";
import Button from "../ui/Button";
import Flexbox from "../ui/Flexbox";
import useMaterials, { MaterialKey } from "./useMaterials";
import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  range: {
    marginBottom: 12,
    overflow: "hidden",
    width: 80,
    "-webkit-appearance": "none",
    backgroundColor: "var(--surface-3)",
    borderRadius: 4,

    "::-webkit-slider-runnable-track": {
      height: 14,
      "-webkit-appearance": "none",
      color: "var(--surface-1)",
      marginTop: -1,
      borderRadius: 4,
    },
    "::-webkit-slider-thumb": {
      width: 12,
      "-webkit-appearance": "none",
      height: 12,
      marginTop: 1,
      cursor: "ew-resize",
      background: "var( --text-primary)",
      boxShadow: " -80px 0 0 80px var(--surface-1)",
      borderRadius: "100%",
    },
  },
  color: {
    marginTop: 12,
    marginBottom: 12,
    padding: 0,
    width: "100%",
    height: 40,
    borderRadius: 4,

    "::-webkit-color-swatch": {
      border: "none",
    },

    "::-webkit-color-swatch-wrapper": {
      padding: 0,
    },
  },
});

export default function MaterialEditor({
  materialKey,
}: {
  materialKey: MaterialKey;
}) {
  const { pickMaterial } = useMaterials();
  const { updateMaterial, removeMaterial } = useWriteToStore();
  const material = pickMaterial(materialKey);

  return (
    <Flexbox direction="column">
      <input
        {...stylex.props(styles.color)}
        type="color"
        value={material.color}
        onChange={(e) => {
          updateMaterial(material.id, { color: e.target.value });
        }}
      />
      <input
        {...stylex.props(styles.range)}
        type="range"
        min="0"
        max="100"
        value={material.opacity * 100}
        onChange={(e) => {
          updateMaterial(material.id, {
            opacity: parseInt(e.target.value) / 100,
          });
        }}
      />
      <Button
        onClick={() => {
          removeMaterial(material.id);
        }}
      >
        Remove
      </Button>
    </Flexbox>
  );
}
