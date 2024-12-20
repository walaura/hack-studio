import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  active: {
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
  box: {
    width: "4em",
    cursor: "pointer",
    height: "4em",
    backgroundColor: "rgba(0, 0, 0, .05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, .1)",
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
