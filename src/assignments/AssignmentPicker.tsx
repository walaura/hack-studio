import Box from "../ui/Box";
import Text from "../ui/Text";
import Flexbox from "../ui/Flexbox";
import SwatchButton from "../ui/swatches/SwatchButton";
import SquareButton from "../ui/swatches/SquareButton";
import { BsArrowsCollapse, BsPlus } from "react-icons/bs";
import Margin from "../ui/Margin";
import stylex from "@stylexjs/stylex";
import { AssignmentKey, Groups, PRETTY_NAMES } from "./Assignments";
import Popover from "../ui/Popover";
import MaterialEditor from "../materials/MaterialEditor";
import { useEffect, useState } from "react";
import { useWriteToStore } from "../store/useStore";
import useMaterials, { MaterialKey } from "../materials/useMaterials";
import useAssignment, {
  Assignment,
  useAssignmentInheritsFrom,
} from "./useAssignment";

export function AssignmentPicker({
  assignmentKey,
  size = "normal",
}: {
  assignmentKey: AssignmentKey;
  size?: keyof typeof sizeStyles;
}) {
  const elevation = Groups[assignmentKey] != null ? 2 : 1;
  const { materials } = useMaterials();
  const { deleteAssignment, addMaterial } = useWriteToStore();
  const maybeInheritance = useAssignmentInheritsFrom(assignmentKey);
  const assignedMaterial = useAssignment(assignmentKey);

  const canRevertToInheritedMaterial =
    assignedMaterial.type !== "inherit" && maybeInheritance !== "DEFAULT_GROUP";

  return (
    <Box elevation={elevation}>
      <Flexbox direction="column" gap={8} xstyle={Margin.all12}>
        <Flexbox direction="row" justify="space-between">
          <Text type="body2">{PRETTY_NAMES[assignmentKey]}</Text>
          {assignedMaterial.type === "inherit" ? (
            <span>
              <Text color="secondary" type="body3">
                {PRETTY_NAMES[assignedMaterial.from]}
              </Text>
            </span>
          ) : null}
        </Flexbox>
        <div
          {...stylex.props(styles.grid, sizeStyles[size])}
          key={materials.length}
        >
          <SquareButton
            type="circle"
            label={`New material`}
            onClick={() =>
              addMaterial({
                color: "blue",
              })
            }
          >
            <BsPlus color="var(--text-primary)" size={"60%"} />
          </SquareButton>
          {materials.map((material) => (
            <Swatch
              assignedMaterial={assignedMaterial}
              key={material.id}
              materialKey={material.id}
              assignmentKeyID={assignmentKey}
            />
          ))}
          {canRevertToInheritedMaterial && (
            <SquareButton
              type="square"
              label={`Match ${PRETTY_NAMES[maybeInheritance]}`}
              onClick={() => deleteAssignment(assignmentKey)}
            >
              <BsArrowsCollapse color="var(--text-primary)" size={"50%"} />
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
    gridTemplateColumns: "repeat(auto-fill, minmax(var(--grid-size), 2fr))",
    gridGap: 2,
  },
});

const sizeStyles = stylex.create({
  small: {
    "--grid-size": "28px",
  },
  normal: {
    "--grid-size": "34px",
  },
  large: {
    "--grid-size": "48px",
  },
});

function Swatch({
  assignedMaterial,
  materialKey,
  assignmentKeyID,
}: {
  assignedMaterial: Assignment;
  materialKey: MaterialKey;
  assignmentKeyID: AssignmentKey;
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
          assignMaterial(assignmentKeyID, materialKey);
        }}
      />
    </Popover>
  );
}
