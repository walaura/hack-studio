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
    <div {...stylex.props(styles.root)}>
      <Home />
    </div>
  );
}
