import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

const styles = stylex.create({
  base: {
    display: "contents",
  },
});

const typeStyles = stylex.create({
  body2: {},
  body2emphasis: {
    fontWeight: 600,
  },
  body3: {
    fontSize: ".8em",
  },
  body3emphasis: {
    fontSize: ".8em",
    fontWeight: 600,
  },
  headline2: {
    fontSize: "1.2rem",
    fontWeight: 600,
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
    <span {...stylex.props(styles.base, typeStyles[type], colorStyles[color])}>
      {children}
    </span>
  );
}
