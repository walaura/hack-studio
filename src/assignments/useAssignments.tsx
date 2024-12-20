import { createContext, useContext, useMemo } from "react";
import { MaterialID } from "../materials/useMaterials";
import { AssignmentSurfaceID } from "./Assignments";
import { EMPTY_MATERIAL_ID } from "../materials/Materials";
import { useStore } from "../store/useStore";

type InternalAssignment =
  | {
      type: "inherit";
      from: AssignmentSurfaceID;
    }
  | {
      type: "assign";
      material: MaterialID;
    };

export type Assignment = InternalAssignment & {
  material: MaterialID;
};

export type Assignments = {
  [K in AssignmentSurfaceID]: Assignment;
};
type InternalAssignments = {
  [K in AssignmentSurfaceID]: InternalAssignment;
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
      AssignmentSurfaceID,
      InternalAssignment
    ][];
    return Object.fromEntries(
      entries.map(([surfaceID, assignment]) => [
        surfaceID as AssignmentSurfaceID,
        resolveAssignment(map, assignment),
      ])
    ) as Assignments;
  }, [internalAssignments]);

  return { assignments };
}

const AssignmentContext =
  // eslint-disable-next-line no-undefined
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
