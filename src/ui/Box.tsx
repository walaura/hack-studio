import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { ReactNode } from "react";

const styles = stylex.create({
  box: {
    backgroundColor: "var(--background)",
    overflow: "auto",
    border: "1px solid var(--divider)",
  },
});

const elevationStyles = stylex.create({
  0: {
    borderWidth: ".3em",
    borderRadius: "2em",
  },
  1: {
    boxShadow: "none",
    borderRadius: "1em",
  },
});

export default function Box({
  children,
  xstyle,
  elevation = 1,
}: {
  children: ReactNode;
  xstyle?: StyleXStyles;
  elevation?: keyof typeof elevationStyles;
}) {
  return (
    <div {...stylex.props(styles.box, xstyle, elevationStyles[elevation])}>
      {children}
    </div>
  );
}
