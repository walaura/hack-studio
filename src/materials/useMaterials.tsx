import { createContext, useContext, useMemo, useState } from "react";

export type MaterialID = string;

type InternalMaterial = {
  color: string;
  opacity?: number;
};
export type Material = InternalMaterial & { id: MaterialID; opacity: number };

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

const resolveMaterial =
  (internalMaterials: InternalMaterials) =>
  (id: MaterialID): Material => {
    if (!internalMaterials[id]) {
      return {
        id: EMPTY_MATERIAL_ID,
        opacity: 1,
        ...DEFAULT_MATERIALS[EMPTY_MATERIAL_ID],
      };
    }
    return {
      id,
      opacity: 1,
      ...internalMaterials[id],
    };
  };

const useMaterialsInternal = () => {
  const [internalMaterials, setMaterials] = useState<InternalMaterials>({
    ...DEFAULT_MATERIALS,
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

  const pickMaterial = useMemo(
    () => resolveMaterial(internalMaterials),
    [internalMaterials]
  );

  const materials: Material[] = useMemo(
    () => Object.entries(internalMaterials).map(([id]) => pickMaterial(id)),
    [internalMaterials, pickMaterial]
  );

  return {
    materials,
    pickMaterial,
    updateMaterial,
    removeMaterial,
    addMaterial,
  };
};

const MaterialsContext =
  createContext<ReturnType<typeof useMaterialsInternal>>(undefined);
export const MaterialsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <MaterialsContext.Provider value={useMaterialsInternal()}>
      {children}
    </MaterialsContext.Provider>
  );
};
export const useMaterials = () => useContext(MaterialsContext);
