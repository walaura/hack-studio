import { createContext, useContext, useState } from "react";

const GizmoContext = createContext<{
  float: boolean;
  toggleFloat: () => void;
  setView: React.Dispatch<React.SetStateAction<string>>;
  cameraRotation: () => {
    rotation: number[];
  };
}>({
  float: true,
  toggleFloat: () => {},
  setView: () => "front",
  cameraRotation: () => ({
    rotation: [0, 0, 0],
  }),
});

function GizmoProvider({ children }: { children: React.ReactNode }) {
  const [float, setFloat] = useState(true);
  const [view, setView] = useState("front");

  const cameraRotation = () => {
    switch (view) {
      case "front":
        return { rotation: [0, 0, 0] };
      case "left":
        return { rotation: [0, Math.PI / 2, 0] };
      case "right":
        return { rotation: [0, -Math.PI / 2, 0] };
      case "bottom":
        return { rotation: [-Math.PI / 2, 0, 0] };
      case "top":
        return { rotation: [Math.PI / 2, 0, 0] };
      case "back":
        return { rotation: [Math.PI, 0, 0] };
    }
  };

  const value = {
    float,
    toggleFloat: () => setFloat((float) => !float),
    setView,
    cameraRotation,
  };
  return (
    <GizmoContext.Provider value={value}>{children}</GizmoContext.Provider>
  );
}

function useGizmos() {
  const context = useContext(GizmoContext);
  return context;
}

export { GizmoProvider, useGizmos };
