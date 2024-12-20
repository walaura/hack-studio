import { Assignment } from "../assignments/useAssignments";
import { MaterialID, useMaterials } from "./useMaterials";
import Box from "../ui/Box";
import Text from "../ui/Text";
import Flexbox from "../ui/Flexbox";
import SwatchButton from "../ui/swatches/SwatchButton";
import SquareButton from "../ui/swatches/SquareButton";
import { BsX } from "react-icons/bs";
import Margin from "../ui/Margin";
import { StyleXStyles } from "@stylexjs/stylex";
import {
  AssignmentSurfaceID,
  GBA_INHERITS_FROM,
  Groups,
  PRETTY_NAMES,
} from "../assignments/Assignments";
import Popover from "../ui/Popover";
import MaterialEditor from "./MaterialEditor";
import { useEffect, useState } from "react";
import { useWriteToStore } from "../store/useStore";

export function MaterialPicker({
  surface,
  assignedMaterial,
  xstyle,
}: {
  surface: AssignmentSurfaceID;
  assignedMaterial: Assignment;
  xstyle?: StyleXStyles;
}) {
  const elevation = Groups[surface] != null ? 2 : 1;
  const { materials } = useMaterials();
  const { assignInheritance } = useWriteToStore();

  return (
    <Box xstyle={xstyle} elevation={elevation}>
      <Flexbox direction="column" gap={4} xstyle={Margin.all12}>
        <Flexbox direction="row" justify="space-between">
          <Text type="body2emphasis">{PRETTY_NAMES[surface]}</Text>
          {assignedMaterial.type === "inherit" ? (
            <span>
              <Text color="secondary" type="body3">
                {PRETTY_NAMES[assignedMaterial.from]}
              </Text>
            </span>
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
            <Swatch
              assignedMaterial={assignedMaterial}
              key={material.id}
              materialID={material.id}
              surfaceID={surface}
            />
          ))}
          {assignedMaterial.type !== "inherit" && (
            <SquareButton
              type="circle"
              label={`Match ${PRETTY_NAMES[GBA_INHERITS_FROM[surface]]}`}
              onClick={() =>
                assignInheritance(surface, GBA_INHERITS_FROM[surface])
              }
            >
              <BsX color="var(--text-primary)" size={"2em"} />
            </SquareButton>
          )}
        </Flexbox>
      </Flexbox>
    </Box>
  );
}

function Swatch({
  assignedMaterial,
  materialID,
  surfaceID,
}: {
  assignedMaterial: Assignment;
  materialID: MaterialID;
  surfaceID: AssignmentSurfaceID;
}) {
  const isActive = assignedMaterial.material === materialID;
  const { pickMaterial } = useMaterials();
  const { assignMaterial } = useWriteToStore();

  const [shouldEnableOnNextTick, setShouldEnableOnNextTick] =
    useState(isActive);

  useEffect(() => {
    setShouldEnableOnNextTick(isActive);
  }, [isActive]);

  return (
    <Popover
      isActive={shouldEnableOnNextTick}
      popover={
        <>
          <Text>{assignedMaterial.material}</Text>
          <MaterialEditor materialID={assignedMaterial.material} />
        </>
      }
    >
      <SwatchButton
        color={pickMaterial(materialID).color}
        isActive={isActive}
        onClick={() => {
          assignMaterial(surfaceID, materialID);
        }}
      />
    </Popover>
  );
}
