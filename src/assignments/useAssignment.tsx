import { useMemo } from "react";
import { MaterialKey } from "../materials/useMaterials";
import {
  AssignmentKey,
  getDefaultInheritanceForProject,
  Groups,
} from "./Assignments";
import { EMPTY_MATERIAL_ID } from "../materials/Materials";
import { Store, useStore } from "../store/useStore";
import useProject, { ProjectType } from "../project/useProject";
type AssignmentFromStore = Store["assignments"][AssignmentKey];

export type Assignment = AssignmentFromStore & {
  material: MaterialKey;
};

function findAssignmentOrDefault(
  projectType: ProjectType,
  assignments: Store["assignments"],
  assignmentKey: AssignmentKey
): AssignmentFromStore {
  const maybeAssignment = assignments[assignmentKey];
  if (maybeAssignment) {
    return maybeAssignment;
  }
  const maybeInherit =
    getDefaultInheritanceForProject(projectType)[assignmentKey];
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
  projectType: ProjectType,
  assignments: Store["assignments"],
  assignmentKey: AssignmentKey
): Assignment {
  const assignment = findAssignmentOrDefault(
    projectType,
    assignments,
    assignmentKey
  );

  if (assignment.type === "inherit") {
    return {
      ...assignment,
      material: resolveAssignment(projectType, assignments, assignment.from)
        .material,
    };
  }
  return assignment;
}

export function useAssignmentInheritsFrom(
  forKey: AssignmentKey
): AssignmentKey {
  const { type } = useProject();

  return useMemo(
    () => getDefaultInheritanceForProject(type)[forKey],
    [forKey, type]
  );
}

export default function useAssignment(forKey: AssignmentKey) {
  const { assignments: internalAssignments } = useStore();
  const { type } = useProject();

  return useMemo(
    () => resolveAssignment(type, internalAssignments, forKey),
    [internalAssignments, forKey, type]
  );
}
