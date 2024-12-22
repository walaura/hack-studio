import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { ReactNode } from "react";

const styles = stylex.create({
  box: {
    backgroundColor: "var(--background)",
  },
});

const elevationStyles = stylex.create({
  0: {
    borderWidth: "0",
    borderRadius: "2em",
    background: "var(--surface-2)",
  },
  1: {
    boxShadow: "none",
    borderRadius: "1em",
    background: "var(--surface-1)",
  },
  2: {
    boxShadow: "inset 0 0 0 2px var(--surface-1)",
    background: "none",
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
