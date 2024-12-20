import { useMemo, useState } from "react";

export type MaterialID = string;

type RawMaterial = {
  color: string;
};

export type Material = RawMaterial & { id: MaterialID };

type Materials = {
  [key: MaterialID]: RawMaterial;
};

export const DEFAULT_MATERIAL: Material = {
  id: "0",
  color: "#ff00ff",
};

export function useMaterials() {
  const [materialsDB, setMaterials] = useState<Materials>({
    [DEFAULT_MATERIAL.id]: DEFAULT_MATERIAL,
    1: { color: "#ff0000" },
    2: { color: "#00ff00" },
    3: { color: "#0000ff" },
  });

  const updateMaterial = (id: MaterialID, to: Partial<RawMaterial>): void => {
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

  const addMaterial = (material: RawMaterial): MaterialID => {
    const id = Date.now() + "-" + Math.random();
    setMaterials((m) => ({
      ...m,
      [id]: material,
    }));

    return id;
  };

  const pickMaterial = (id: MaterialID): Material => {
    if (!materialsDB[id]) {
      return DEFAULT_MATERIAL;
    }
    return {
      id,
      ...materialsDB[id],
    };
  };

  const materials: Material[] = useMemo(
    () => Object.entries(materialsDB).map(([id, material]) => pickMaterial(id)),
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
