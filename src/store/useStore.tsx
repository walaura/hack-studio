import { createContext, useContext, useMemo, useRef, useState } from "react";
import { MaterialID } from "../materials/useMaterials";
import { DEFAULT_MATERIALS } from "../materials/Materials";
import {
  AssignmentSurfaceID,
  DEFAULT_ASSIGNMENTS,
} from "../assignments/Assignments";

export type Store = {
  assignments: {
    [K in AssignmentSurfaceID]:
      | {
          type: "inherit";
          from: AssignmentSurfaceID;
        }
      | {
          type: "assign";
          material: MaterialID;
        };
  };
  materials: {
    [key: MaterialID]: {
      color: string;
      opacity?: number;
    };
  };
};

const useWriteMaterialsToStore = (
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

const useWriteAssignmentsToStore = (
  updateStore: React.Dispatch<React.SetStateAction<Store>>
) => {
  const setAssignments = (callback) =>
    updateStore((store) => ({
      ...store,
      assignments: {
        ...store.assignments,
        ...callback(store.assignments),
      },
    }));

  const assignMaterial = (
    surfaceID: AssignmentSurfaceID,
    materialID: MaterialID
  ) => {
    setAssignments((prev) => ({
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
    setAssignments((prev) => ({
      ...prev,
      [surfaceID]: {
        type: "inherit",
        from,
      },
    }));
  };

  return { assignInheritance, assignMaterial };
};

const StoreReadContext = createContext<Store>(undefined);
const StoreWriteContext = createContext<
  ReturnType<typeof useWriteMaterialsToStore> &
    ReturnType<typeof useWriteAssignmentsToStore>
>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Store>({
    materials: { ...DEFAULT_MATERIALS },
    assignments: { ...DEFAULT_ASSIGNMENTS },
  });
  const history = useRef([]);
  const [undoStackDepth, setUndoStackDepth] = useState(0);

  const updateStore = (callback) => {
    setStore((store) => {
      history.current.push(store);
      if (history.current.length > 4) {
        history.current.shift();
      }
      setUndoStackDepth(0);
      console.log(history);
      return callback(store);
    });
  };

  const writeMaterials = useWriteMaterialsToStore(updateStore);
  const writeAssignments = useWriteAssignmentsToStore(updateStore);

  const updaters = useMemo(
    () => ({
      ...writeMaterials,
      ...writeAssignments,
    }),
    [writeMaterials, writeAssignments]
  );

  return (
    <StoreWriteContext.Provider value={updaters}>
      <StoreReadContext.Provider value={store}>
        <button
          onClick={() => {
            setUndoStackDepth((curr) => {
              const nextInStack = curr + 1;
              const nextStore =
                history.current[history.current.length - nextInStack];
              if (nextStore) {
                setStore(history.current[history.current.length - nextInStack]);
              }
              return nextInStack;
            });
          }}
        >
          Undo
        </button>
        {undoStackDepth > 0 && (
          <button
            onClick={() => {
              setUndoStackDepth((curr) => curr + 1);
            }}
          >
            Redo
          </button>
        )}
        {children}
      </StoreReadContext.Provider>
    </StoreWriteContext.Provider>
  );
};
export const useStore = () => useContext(StoreReadContext);
export const useWriteToStore = () => useContext(StoreWriteContext);
