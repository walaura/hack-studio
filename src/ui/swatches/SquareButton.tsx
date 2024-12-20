import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  active: {
    backgroundColor: "var(--surface-4)",
    boxShadow: "none",
  },
  box: {
    width: "3em",
    cursor: "pointer",
    height: "3em",
    boxShadow: "inset 0 0 0 2px var(--surface-3)",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    ":hover": {
      backgroundColor: "var(--surface-3)",
      boxShadow: "none",
    },
  },
});

const typeStyles = stylex.create({
  square: {
    borderRadius: ".6em",
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
  type: keyof typeof typeStyles;
}) {
  return (
    <button
      title={label}
      {...stylex.props(styles.box, typeStyles[type], isActive && styles.active)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
