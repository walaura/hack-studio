import { useMemo } from "react";
import { MaterialKey } from "../materials/useMaterials";
import { AssignmentKey, GBA_INHERITS_FROM } from "./Assignments";
import { EMPTY_MATERIAL_ID } from "../materials/Materials";
import { Store, useStore } from "../store/useStore";

type AssignmentFromStore = Store["assignments"][AssignmentKey];

export type Assignment = AssignmentFromStore & {
  material: MaterialKey;
};

function findAssignmentOrDefault(
  assignments: Store["assignments"],
  assignmentKey: AssignmentKey
): AssignmentFromStore {
  const maybeAssignment = assignments[assignmentKey];
  if (maybeAssignment) {
    return maybeAssignment;
  }
  const maybeInherit = GBA_INHERITS_FROM[assignmentKey];
  if (maybeInherit) {
    return {
      type: "inherit",
      from: maybeInherit,
    };
  }

  return {
    type: "assign",
    material: EMPTY_MATERIAL_ID,
  };
}

/**
 * Follows the inheritance chain to resolve the
 * final material assignment for a surface.
 */
function resolveAssignment(
  assignments: Store["assignments"],
  assignmentKey: AssignmentKey
): Assignment {
  const assignment = findAssignmentOrDefault(assignments, assignmentKey);

  if (assignment.type === "inherit") {
    return {
      ...assignment,
      material: resolveAssignment(assignments, assignment.from).material,
    };
  }
  return assignment;
}

export default function useAssignment(forKey: AssignmentKey) {
  const { assignments: internalAssignments } = useStore();

  return useMemo(
    () => resolveAssignment(internalAssignments, forKey),
    [internalAssignments, forKey]
  );
}
