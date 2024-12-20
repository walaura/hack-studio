import stylex, { types } from "@stylexjs/stylex";
import { ReactNode } from "react";

const typeStyles = stylex.create({
  body2: {},
  body2emphasis: {
    fontWeight: "bold",
  },
  body3: {
    fontSize: ".8em",
  },
  body3emphasis: {
    fontSize: ".8em",
    fontWeight: "bold",
  },
  headline2: {
    fontSize: "1.4em",
    fontWeight: "bold",
  },
});

const colorStyles = stylex.create({
  primary: {
    color: "var(--text-primary)",
  },
  secondary: {
    color: "var(--text-secondary)",
  },
});

export default function Text({
  type = "body2",
  color = "primary",
  children,
}: {
  type?: keyof typeof typeStyles;
  color?: keyof typeof colorStyles;
  children: ReactNode;
}) {
  return (
    <span {...stylex.props(typeStyles[type], colorStyles[color])}>
      {children}
    </span>
  );
}
