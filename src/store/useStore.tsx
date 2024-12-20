import { createContext, useContext, useState } from "react";
import { MaterialID } from "../materials/useMaterials";
import { DEFAULT_MATERIALS } from "../materials/Materials";

export type Store = {
  materials: {
    [key: MaterialID]: {
      color: string;
      opacity?: number;
    };
  };
};

const useStoreWriteInternal = (
  updateStore: React.Dispatch<React.SetStateAction<Store>>
) => {
  const setMaterials = (callback) =>
    updateStore((store) => ({
      ...store,
      materials: {
        ...store.materials,
        ...callback(store.materials),
      },
    }));

  const updateMaterial = (
    id: MaterialID,
    to: Partial<Store["materials"][string]>
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

  const addMaterial = (material: Store["materials"][string]): MaterialID => {
    const id = Date.now() + "-" + Math.random();
    setMaterials((m) => ({
      ...m,
      [id]: material,
    }));

    return id;
  };

  return { setMaterials, updateMaterial, removeMaterial, addMaterial };
};

const StoreReadContext = createContext<Store>(undefined);
const StoreWriteContext =
  createContext<ReturnType<typeof useStoreWriteInternal>>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Store>({
    materials: { ...DEFAULT_MATERIALS },
  });
  const updateStore = setStore;

  return (
    <StoreWriteContext.Provider value={useStoreWriteInternal(updateStore)}>
      <StoreReadContext.Provider value={store}>
        {children}
      </StoreReadContext.Provider>
    </StoreWriteContext.Provider>
  );
};
export const useStore = () => useContext(StoreReadContext);
export const useWriteStore = () => useContext(StoreWriteContext);
