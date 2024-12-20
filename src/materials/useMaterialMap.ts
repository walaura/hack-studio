import { useMemo, useState } from "react";
import { DEFAULT_MATERIAL, Material, MaterialID } from "./useMaterials";

enum Button {
  BUTTON_A = "BUTTON_A",
  BUTTON_B = "BUTTON_B",
}

enum Membrane {
  MEMBRANE_AB = "MEMBRANE_AB",
  MEMBRANE_DPAD = "MEMBRANE_DPAD",
  MEMBRANE_START_SELECT = "MEMBRANE_START_SELECT",
}

enum Groups {
  EVERYTHING = "EVERYTHING",
  ALL_BUTTONS = "ALL_BUTTONS",
  FACE_BUTTONS = "FACE_BUTTONS",
  SIDE_RAILS = "RAILS",
}

const Surface = { ...Groups, ...Button, ...Membrane };
export type SurfaceID = keyof typeof Surface;

type InternalMaterialAssignment =
  | {
      type: "inherit";
      from: SurfaceID;
    }
  | {
      type: "assign";
      material: MaterialID;
    };

export type MaterialAssignment = InternalMaterialAssignment & {
  material: MaterialID;
};

export type MaterialMap = {
  [K in SurfaceID]: MaterialAssignment;
};
type InternalMaterialMap = {
  [K in SurfaceID]: InternalMaterialAssignment;
};

/**
 * Follows the inheritance chain to resolve the
 * final material assignment for a surface.
 */
function resolveMaterialAssignment(
  materialMap: InternalMaterialMap,
  assignment: InternalMaterialAssignment
): MaterialAssignment {
  if (!assignment) {
    return {
      type: "assign",
      material: DEFAULT_MATERIAL.id,
    };
  }
  if (assignment.type === "inherit") {
    return {
      ...assignment,
      material: resolveMaterialAssignment(
        materialMap,
        materialMap[assignment.from]
      ).material,
    };
  }
  return assignment;
}

export function useMaterialMap() {
  const [materialMapDB, setMaterialMapDB] = useState<Partial<MaterialMap>>({});

  const assignMaterial = (surfaceID: SurfaceID, materialID: MaterialID) => {
    setMaterialMapDB((prev) => ({
      ...prev,
      [surfaceID]: {
        type: "assign",
        material: materialID,
      },
    }));
  };

  const assignInheritance = (surfaceID: SurfaceID, from: SurfaceID) => {
    setMaterialMapDB((prev) => ({
      ...prev,
      [surfaceID]: {
        type: "inherit",
        from,
      },
    }));
  };

  const materialMap: MaterialMap = useMemo(() => {
    const map = {
      ...DEFAULT_MATERIAL_MAP,
      ...materialMapDB,
    } as InternalMaterialMap;
    const entries = Object.entries(map) as [
      SurfaceID,
      InternalMaterialAssignment
    ][];
    return Object.fromEntries(
      entries.map(([surfaceID, assignment]) => [
        surfaceID as SurfaceID,
        resolveMaterialAssignment(map, assignment),
      ])
    ) as MaterialMap;
  }, [materialMapDB]);

  return { materialMap, assignMaterial, assignInheritance };
}

const DEFAULT_MATERIAL_MAP: InternalMaterialMap = Object.keys(Surface).reduce(
  (acc, key) => {
    acc[key] = {
      type: "inherit",
      from: "EVERYTHING",
    };
    return acc;
  },
  {} as InternalMaterialMap
);
DEFAULT_MATERIAL_MAP[Groups.EVERYTHING] = {
  type: "assign",
  material: DEFAULT_MATERIAL.id,
};
