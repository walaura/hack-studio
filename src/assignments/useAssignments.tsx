import { createContext, useContext, useMemo, useState } from "react";
import { MaterialID, useMaterials } from "../materials/useMaterials";
import {
  AssignmentSurface,
  AssignmentSurfaceID,
  GBA_INHERITS_FROM,
  Groups,
} from "./Assignments";
import { EMPTY_MATERIAL_ID } from "../materials/Materials";

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
  const [assignmentsDB, setAssignmentsDB] = useState<Partial<Assignments>>({});

  const assignMaterial = (
    surfaceID: AssignmentSurfaceID,
    materialID: MaterialID
  ) => {
    setAssignmentsDB((prev) => ({
      ...prev,
      [surfaceID]: {
        type: "assign",
        material: materialID,
      },
    }));
  };

  const assignInheritance = (
    surfaceID: AssignmentSurfaceID,
    from: AssignmentSurfaceID
  ) => {
    setAssignmentsDB((prev) => ({
      ...prev,
      [surfaceID]: {
        type: "inherit",
        from,
      },
    }));
  };

  const defaultAssignments = useDefaultAssignments();
  const assignments: Assignments = useMemo(() => {
    const map = {
      ...defaultAssignments,
      ...assignmentsDB,
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
  }, [defaultAssignments, assignmentsDB]);

  return { assignments, assignMaterial, assignInheritance };
}

function useDefaultAssignments() {
  const { pickMaterial } = useMaterials();

  /*
  GBA
  */
  const defaultAssignments: InternalAssignments = Object.keys(
    AssignmentSurface
  ).reduce((acc, key) => {
    acc[key] = {
      type: "inherit",
      from: GBA_INHERITS_FROM[key],
    };
    return acc;
  }, {} as InternalAssignments);
  defaultAssignments[Groups.EVERYTHING] = {
    type: "assign",
    material: EMPTY_MATERIAL_ID,
  };
  defaultAssignments[Groups.ALL_BUTTONS] = {
    type: "assign",
    material: pickMaterial("gray").id,
  };
  defaultAssignments[Groups.SHELL] = {
    type: "assign",
    material: pickMaterial("purple").id,
  };

  return defaultAssignments;
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
