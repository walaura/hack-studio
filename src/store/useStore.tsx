import { createContext, useContext, useMemo, useRef, useState } from "react";
import { MaterialKey } from "../materials/useMaterials";
import { DEFAULT_MATERIALS } from "../materials/Materials";
import { AssignmentKey, DEFAULT_ASSIGNMENTS } from "../assignments/Assignments";
import { ProjectType } from "../project/useProject";

const MAX_UNDO_LEVEL = 20;

export type Store = {
  project: {
    type: ProjectType;
  };
  assignments: {
    [K in AssignmentKey]:
      | {
          type: "inherit";
          from: AssignmentKey;
        }
      | {
          type: "assign";
          material: MaterialKey;
        };
  };
  materials: {
    [key: MaterialKey]: {
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
        ...callback(store.materials),
      },
    }));

  const updateMaterial = (
    id: MaterialKey,
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

  const removeMaterial = (id: MaterialKey): void => {
    setMaterials((m) => {
      const next = { ...m };
      delete next[id];
      return next;
    });
  };

  const addMaterial = (material: Store["materials"][string]): MaterialKey => {
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
    surfaceID: AssignmentKey,
    materialKey: MaterialKey
  ) => {
    setAssignments((prev) => ({
      ...prev,
      [surfaceID]: {
        type: "assign",
        material: materialKey,
      },
    }));
  };

  const assignInheritance = (surfaceID: AssignmentKey, from: AssignmentKey) => {
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

const StoreHistoryContext = createContext<{
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}>(undefined);
const StoreReadContext = createContext<Store>(undefined);
const StoreWriteContext = createContext<
  ReturnType<typeof useWriteMaterialsToStore> &
    ReturnType<typeof useWriteAssignmentsToStore>
>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<Store>({
    materials: { ...DEFAULT_MATERIALS },
    assignments: { ...DEFAULT_ASSIGNMENTS },
    project: {
      type: ProjectType.GBA_SP,
    },
  });
  const historyRef = useRef([]);
  const [undoStackDepth, setUndoStackDepth] = useState(-1);

  const updateStore = (callback) => {
    setStore((store) => {
      const next = callback(store);
      historyRef.current.push(next);
      if (historyRef.current.length > MAX_UNDO_LEVEL) {
        historyRef.current.shift();
      }
      setUndoStackDepth(0);
      return next;
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

  const history = useMemo(
    () => ({
      onUndo: () => {
        setUndoStackDepth((curr) => {
          const nextInStack = Math.min(curr + 1, MAX_UNDO_LEVEL);
          const nextStore =
            historyRef.current[historyRef.current.length - 1 - nextInStack];

          if (nextStore) {
            setStore(nextStore);
          }
          return nextInStack;
        });
      },
      onRedo: () => {
        setUndoStackDepth((curr) => {
          const nextInStack = Math.max(curr - 1, 0);
          const nextStore =
            historyRef.current[historyRef.current.length - 1 - nextInStack];
          console.log(
            historyRef.current,
            historyRef.current.length - 1 - nextInStack,
            curr,
            nextInStack,
            nextStore
          );
          if (nextStore) {
            setStore(nextStore);
          }
          return nextInStack;
        });
      },
      canRedo: undoStackDepth > 0,
      canUndo: undoStackDepth > -1 && undoStackDepth < MAX_UNDO_LEVEL,
    }),
    [undoStackDepth]
  );

  return (
    <StoreHistoryContext.Provider value={history}>
      <StoreWriteContext.Provider value={updaters}>
        <StoreReadContext.Provider value={store}>
          {children}
        </StoreReadContext.Provider>
      </StoreWriteContext.Provider>
    </StoreHistoryContext.Provider>
  );
};
export const useStoreHistory = () => useContext(StoreHistoryContext);
export const useStore = () => useContext(StoreReadContext);
export const useWriteToStore = () => useContext(StoreWriteContext);
