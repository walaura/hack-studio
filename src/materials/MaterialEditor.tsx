import { useWriteToStore } from "../store/useStore";
import Flexbox from "../ui/Flexbox";
import { MaterialKey, useMaterials } from "./useMaterials";

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
        type="color"
        value={material.color}
        onChange={(e) => {
          updateMaterial(material.id, { color: e.target.value });
        }}
      />
      <input
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
      <button
        onClick={() => {
          removeMaterial(material.id);
        }}
      >
        Remove
      </button>
    </Flexbox>
  );
}
