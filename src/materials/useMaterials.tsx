import { createContext, useContext, useMemo } from "react";
import { DEFAULT_MATERIALS, EMPTY_MATERIAL_ID } from "./Materials";
import { Store, useStore } from "../store/useStore";

export type MaterialKey = string;

export type Material = Store["materials"][string] & {
  id: MaterialKey;
  opacity: number;
};

const resolveMaterial =
  (internalMaterials: Store["materials"]) =>
  (id: MaterialKey): Material => {
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
  const { materials: materialsFromStore } = useStore();
  console.log(materialsFromStore);

  const pickMaterial = useMemo(
    () => resolveMaterial(materialsFromStore),
    [materialsFromStore]
  );

  const materials: Material[] = useMemo(
    () => Object.entries(materialsFromStore).map(([id]) => pickMaterial(id)),
    [materialsFromStore, pickMaterial]
  );

  return {
    materials,
    pickMaterial,
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
