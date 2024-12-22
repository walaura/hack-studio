import { createContext, useCallback, useContext } from "react";
import { MaterialKey } from "../materials/useMaterials";
import { AssignmentKey, GBA_INHERITS_FROM } from "./Assignments";
import { EMPTY_MATERIAL_ID } from "../materials/Materials";
import { useStore } from "../store/useStore";

type InternalAssignment =
  | {
      type: "inherit";
      from: AssignmentKey;
    }
  | {
      type: "assign";
      material: MaterialKey;
    };

export type Assignment = InternalAssignment & {
  material: MaterialKey;
};

export type Assignments = {
  [K in AssignmentKey]: Assignment;
};
type InternalAssignments = {
  [K in AssignmentKey]: InternalAssignment;
};

function findAssignmentOrDefault(
  assignments: InternalAssignments,
  assignmentKey: AssignmentKey
): InternalAssignment {
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
  assignments: InternalAssignments,
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

function useAssignmentInternal() {
  const { assignments: internalAssignments } = useStore();

  return useCallback(
    (forKey: AssignmentKey) => resolveAssignment(internalAssignments, forKey),
    [internalAssignments]
  );
}

const AssignmentContext =
  createContext<ReturnType<typeof useAssignmentInternal>>(undefined);

export const AssignmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getAssignment = useAssignmentInternal();
  return (
    <AssignmentContext.Provider value={getAssignment}>
      {children}
    </AssignmentContext.Provider>
  );
};

const useAssignment = (forKey: AssignmentKey) =>
  useContext(AssignmentContext)(forKey);
export default useAssignment;
