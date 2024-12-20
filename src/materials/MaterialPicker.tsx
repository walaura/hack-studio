import {
  GBA_INHERITS_FROM,
  Groups,
  MaterialAssignment,
  PRETTY_NAMES,
  SurfaceID,
} from "./useMaterialAssignments";
import { Material, MaterialID } from "./useMaterials";
import Box from "../ui/Box";
import Text from "../ui/Text";
import Flexbox from "../ui/Flexbox";
import SwatchButton from "../ui/swatches/SwatchButton";
import SquareButton from "../ui/swatches/SquareButton";
import { BsX } from "react-icons/bs";
import Margin from "../ui/Margin";
import { StyleXStyles } from "@stylexjs/stylex";

export function MaterialPicker({
  surface,
  materials,
  assignedMaterial,
  onPickMaterial,
  onPickInheritance,
  xstyle,
}: {
  surface: SurfaceID;
  materials: Material[];
  assignedMaterial: MaterialAssignment;
  onPickMaterial: (id: MaterialID) => void;
  onPickInheritance: (id: SurfaceID) => void;
  xstyle?: StyleXStyles;
}) {
  const elevation = Groups[surface] != null ? 2 : 1;

  return (
    <Box xstyle={xstyle} elevation={elevation}>
      <Flexbox direction="column" gap={4} xstyle={Margin.all12}>
        <Flexbox direction="row" justify="space-between">
          <Text type="body2emphasis">{PRETTY_NAMES[surface]}</Text>
          {assignedMaterial.type === "inherit" ? (
            <Text color="secondary" type="body3">
              {PRETTY_NAMES[assignedMaterial.from].toLocaleLowerCase()}
            </Text>
          ) : null}
        </Flexbox>
        <Flexbox
          wrap={true}
          direction="row"
          gap={4}
          align="start"
          justify="start"
        >
          {materials.map((material) => (
            <SwatchButton
              color={material.color}
              key={material.id}
              isActive={assignedMaterial.material === material.id}
              onClick={() => {
                onPickMaterial(material.id);
              }}
            />
          ))}
          {assignedMaterial.type !== "inherit" && (
            <SquareButton
              type="circle"
              label={`Match ${PRETTY_NAMES[GBA_INHERITS_FROM[surface]]}`}
              onClick={() => onPickInheritance(GBA_INHERITS_FROM[surface])}
            >
              <BsX size={"2em"} />
            </SquareButton>
          )}
        </Flexbox>
      </Flexbox>
    </Box>
  );
}
