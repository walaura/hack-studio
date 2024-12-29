import { useGizmos } from "./useGizmos";
import stylex from "@stylexjs/stylex";
import Button from "../ui/Button";
import { FaPause, FaPlay } from "react-icons/fa6";
import { Bottom, Front, Left } from "../ui/Icons";

const styles = stylex.create({
  wrapper: {
    position: "absolute",
    top: 20,
    left: 20,
    background: "var(--surface-1)",
    padding: 12,
    zIndex: 99,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    boxShadow: "0 4px 6px 0 var(--surface-1-shadow)",
    borderRadius: 8,
    minWidth: 150,
  },
  formRow: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--gap)",
  },
  divider: {
    borderBottom: "1px solid var(--surface-2)",
  },
});

export const Gizmos = () => {
  const { float, toggleFloat, setView } = useGizmos();
  return (
    <div {...stylex.props(styles.wrapper)}>
      <div {...stylex.props(styles.formRow)}>
        <Button onClick={() => toggleFloat()}>
          {float ? <FaPause /> : <FaPlay />}
        </Button>
      </div>
      <div {...stylex.props(styles.divider)} />
      <div {...stylex.props(styles.formRow)}>
        <label>View</label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <Button onClick={() => setView("front")} type="empty">
            <Front
              style={{
                transform: "scale(-1)",
              }}
            />
          </Button>
          <Button onClick={() => setView("left")} type="empty">
            <Left />
          </Button>
          <Button type="empty" onClick={() => setView("right")}>
            <Left
              style={{
                transform: "scale(-1)",
              }}
            />
          </Button>
          <Button type="empty" onClick={() => setView("back")}>
            <Front />
          </Button>
          <Button type="empty" onClick={() => setView("bottom")}>
            <Bottom />
          </Button>
          <Button type="empty" onClick={() => setView("top")}>
            <Bottom
              style={{
                transform: "scale(-1)",
              }}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
