import { useMemo, useState } from "react";

type MaterialID = string;

type RawMaterial = {
  color: string;
};

type Material = RawMaterial & { id: MaterialID };

type Materials = {
  [key: MaterialID]: RawMaterial;
};

export function useMaterials() {
  const [materialsDB, setMaterials] = useState<Materials>({});

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

  const materials: Material[] = useMemo(
    () =>
      Object.entries(materialsDB).map(([id, material]) => ({
        id,
        ...material,
      })),
    [materialsDB]
  );

  return {
    materials,
    updateMaterial,
    removeMaterial,
    addMaterial,
  };
}
