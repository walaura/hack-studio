import Box from "../ui/Box";
import Button from "../ui/Button";
import { MaterialID, useMaterials } from "./useMaterials";

export default function MaterialEditor({
  materialID,
}: {
  materialID: MaterialID;
}) {
  const { updateMaterial, pickMaterial, removeMaterial } = useMaterials();
  const material = pickMaterial(materialID);

  return (
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
  );
}
