import { createContext, useContext, useMemo } from "react";
import { MaterialKey } from "../materials/useMaterials";
import { AssignmentKey } from "./Assignments";
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

/**
 * Follows the inheritance chain to resolve the
 * final material assignment for a surface.
 */
function resolveAssignment(
  assignments: InternalAssignments,
  assignment: InternalAssignment
): Assignment {
  if (!assignment) {
    return {
      type: "assign",
      material: EMPTY_MATERIAL_ID,
    };
  }
  if (assignment.type === "inherit") {
    return {
      ...assignment,
      material: resolveAssignment(assignments, assignments[assignment.from])
        .material,
    };
  }
  return assignment;
}

function useAssignmentsInternal() {
  const { assignments: internalAssignments } = useStore();

  const assignments: Assignments = useMemo(() => {
    const map = {
      ...internalAssignments,
    } as InternalAssignments;
    const entries = Object.entries(map) as [
      AssignmentKey,
      InternalAssignment
    ][];
    return Object.fromEntries(
      entries.map(([surfaceID, assignment]) => [
        surfaceID as AssignmentKey,
        resolveAssignment(map, assignment),
      ])
    ) as Assignments;
  }, [internalAssignments]);

  return { assignments };
}

const AssignmentContext =
  createContext<ReturnType<typeof useAssignmentsInternal>>(undefined);

export const AssignmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AssignmentContext.Provider value={useAssignmentsInternal()}>
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignments = () => useContext(AssignmentContext);
