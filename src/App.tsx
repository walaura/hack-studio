import { MaterialAssignmentProvider } from "./materials/useMaterialAssignments";
import { MaterialsProvider } from "./materials/useMaterials";
import Home from "./route/Home";
import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <MaterialsProvider>
      <MaterialAssignmentProvider>
        <div {...stylex.props(styles.root)}>
          <Home />
        </div>
      </MaterialAssignmentProvider>
    </MaterialsProvider>
  );
}
