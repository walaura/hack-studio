import stylex from "@stylexjs/stylex";
import SquareButton from "./SquareButton";

const styles = stylex.create({
  swatch: {
    width: "70%",
    height: "70%",
    borderRadius: "100%",
  },
  swatchOf: (color: string) => ({
    backgroundColor: color,
  }),
  active: {
    backgroundColor: "rgba(0, 0, 0, .3)",
  },
  box: {
    width: "4em",
    cursor: "pointer",
    height: "4em",
    backgroundColor: "rgba(0, 0, 0, .1)",
    borderRadius: ".6em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
});

export default function SwatchButton({
  onClick,
  color,
  isActive = false,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color: string;
  isActive?: boolean;
}) {
  return (
    <SquareButton onClick={onClick} isActive={isActive}>
      <div {...stylex.props(styles.swatch, styles.swatchOf(color))} />
    </SquareButton>
  );
}
