import stylex from "@stylexjs/stylex";
import SquareButton from "./SquareButton";
import useMaterials, { MaterialKey } from "../../materials/useMaterials";
import { BsDice5 } from "react-icons/bs";

const styles = stylex.create({
  swatch: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const swatchStyles = stylex.create({
  color: (color: string) => ({
    backgroundColor: color,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  }),
  opacity: (opacity: number) => ({
    opacity,
  }),
  filter: {
    filter: "blur(5px)",
  },
});

export default function SwatchButton({
  onClick,
  materialKey,
  isActive = false,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  materialKey: MaterialKey;
  isActive?: boolean;
}) {
  const { pickMaterial } = useMaterials();
  const { color, opacity } = pickMaterial(materialKey);

  return (
    <SquareButton onClick={onClick} isActive={isActive}>
      <div {...stylex.props(styles.swatch)}>
        <div
          {...stylex.props(
            swatchStyles.color(color),
            opacity !== 1 && swatchStyles.opacity(opacity)
          )}
        ></div>
        {opacity !== 1 && (
          <BsDice5 color="#000" style={{ filter: "blur(2px)" }} size={"80%"} />
        )}
      </div>
    </SquareButton>
  );
}
