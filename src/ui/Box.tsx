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
    borderRadius: 8,
    background: "var(--surface-1)",
    boxShadow: "0 1px 6px 0 var(--surface-1-shadow)",
    border: "1px solid var(--surface-2)",
  },
  1: {
    boxShadow: "none",
    borderRadius: 6,
    background: "var(--surface-2)",
  },
  2: {
    boxShadow: "inset 0 0 0 1px var(--surface-2)",
    background: "none",
    borderRadius: 6,
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
