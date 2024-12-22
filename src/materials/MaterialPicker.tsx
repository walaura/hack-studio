import Box from "../ui/Box";
import Text from "../ui/Text";
import Flexbox from "../ui/Flexbox";
import SwatchButton from "../ui/swatches/SwatchButton";
import SquareButton from "../ui/swatches/SquareButton";
import { BsArrowUp, BsPlus } from "react-icons/bs";
import Margin from "../ui/Margin";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import {
  AssignmentKey,
  Groups,
  PRETTY_NAMES,
} from "../assignments/Assignments";
import Popover from "../ui/Popover";
import MaterialEditor from "./MaterialEditor";
import { useEffect, useState } from "react";
import { useWriteToStore } from "../store/useStore";
import useMaterials, { MaterialKey } from "./useMaterials";
import {
  Assignment,
  useAssignmentInheritsFrom,
} from "../assignments/useAssignment";

export function MaterialPicker({
  surface,
  assignedMaterial,
  xstyle,
}: {
  surface: AssignmentKey;
  assignedMaterial: Assignment;
  xstyle?: StyleXStyles;
}) {
  const elevation = Groups[surface] != null ? 2 : 1;
  const { materials } = useMaterials();
  const { assignInheritance, addMaterial } = useWriteToStore();
  const maybeInheritance = useAssignmentInheritsFrom(surface);

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
        <div {...stylex.props(styles.grid)} key={materials.length}>
          <SquareButton
            type="circle"
            label={`New material`}
            onClick={() =>
              addMaterial({
                color: "blue",
              })
            }
          >
            <BsPlus color="var(--text-primary)" size={"2em"} />
          </SquareButton>
          {materials.map((material) => (
            <Swatch
              assignedMaterial={assignedMaterial}
              key={material.id}
              materialKey={material.id}
              surfaceID={surface}
            />
          ))}
          {assignedMaterial.type !== "inherit" && (
            <SquareButton
              type="circle"
              label={`Match ${PRETTY_NAMES[maybeInheritance]}`}
              onClick={() => assignInheritance(surface, maybeInheritance)}
            >
              <BsArrowUp color="var(--text-primary)" size={"1.6em"} />
            </SquareButton>
          )}
        </div>
      </Flexbox>
    </Box>
  );
}

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(3.6em, 2fr))",
    gridGap: 2,
  },
});

function Swatch({
  assignedMaterial,
  materialKey,
  surfaceID,
}: {
  assignedMaterial: Assignment;
  materialKey: MaterialKey;
  surfaceID: AssignmentKey;
}) {
  const isActive = assignedMaterial.material === materialKey;
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
          <MaterialEditor materialKey={assignedMaterial.material} />
        </>
      }
    >
      <SwatchButton
        materialKey={materialKey}
        isActive={isActive}
        onClick={() => {
          assignMaterial(surfaceID, materialKey);
        }}
      />
    </Popover>
  );
}
