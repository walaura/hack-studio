import { useMemo, useState } from "react";

export type MaterialID = string;

type InternalMaterial = {
  color: string;
};

export type Material = InternalMaterial & { id: MaterialID };

type Materials = {
  [key: MaterialID]: Material;
};

type InternalMaterials = {
  [key: MaterialID]: InternalMaterial;
};

export const EMPTY_MATERIAL_ID = "0";
const DEFAULT_MATERIALS: InternalMaterials = {
  [EMPTY_MATERIAL_ID]: {
    color: "#ff00ff",
  },
  purple: {
    color: "#7F00FF",
  },
  gray: {
    color: "#eee",
  },
};

export function useMaterials() {
  const [materialsDB, setMaterials] = useState<InternalMaterials>({
    ...DEFAULT_MATERIALS,
    1: { color: "#ff0000" },
    2: { color: "#00ff00" },
    3: { color: "#0000ff" },
  });

  const updateMaterial = (
    id: MaterialID,
    to: Partial<InternalMaterial>
  ): void => {
    setMaterials((m) => ({
      ...m,
      [id]: {
        ...m[id],
        ...to,
      },
    }));
  };

  const removeMaterial = (id: MaterialID): void => {
    setMaterials((m) => {
      const next = { ...m };
      delete next[id];
      return next;
    });
  };

  const addMaterial = (material: InternalMaterial): MaterialID => {
    const id = Date.now() + "-" + Math.random();
    setMaterials((m) => ({
      ...m,
      [id]: material,
    }));

    return id;
  };

  const pickMaterial = (id: MaterialID): Material => {
    if (!materialsDB[id]) {
      return {
        id: EMPTY_MATERIAL_ID,
        ...DEFAULT_MATERIALS[EMPTY_MATERIAL_ID],
      };
    }
    return {
      id,
      ...materialsDB[id],
    };
  };

  const materials: Material[] = useMemo(
    () => Object.entries(materialsDB).map(([id]) => pickMaterial(id)),
    [materialsDB]
  );

  return {
    materials,
    pickMaterial,
    updateMaterial,
    removeMaterial,
    addMaterial,
  };
}
