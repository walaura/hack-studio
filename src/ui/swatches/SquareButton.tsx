import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  activeOverlay: {
    boxShadow:
      "inset 0 0 0 1px var(--selected), inset 0 0 0 2px var(--surface-2)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  box: {
    position: "relative",
    width: "100%",
    aspectRatio: "1/1",
    backgroundColor: "var(--surface-highlight)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    overflow: "hidden",
  },
});

const typeStyles = stylex.create({
  square: {
    borderRadius: 2,
  },
  circle: {
    borderRadius: "100%",
  },
});

export default function SquareButton({
  onClick,
  children,
  label,
  isActive = false,
  type = "square",
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  label?: string;
  isActive?: boolean;
  type?: keyof typeof typeStyles;
}) {
  return (
    <button
      title={label}
      {...stylex.props(styles.box, typeStyles[type])}
      onClick={onClick}
    >
      {children}
      {isActive && <div {...stylex.props(styles.activeOverlay)} />}
    </button>
  );
}
