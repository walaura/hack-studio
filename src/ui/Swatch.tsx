import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  swatchOf: (color: string) => ({
    backgroundColor: color,
  }),
  active: {
    boxShadow: "0 0 0 2px var(--highlight)",
  },
});

export default function Swatch({
  onClick,
  color,
  isActive = false,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color: string;
  isActive?: boolean;
}) {
  return (
    <button
      {...stylex.props(
        styles.swatch,
        styles.swatchOf(color),
        isActive && styles.active
      )}
      onClick={onClick}
    ></button>
  );
}
