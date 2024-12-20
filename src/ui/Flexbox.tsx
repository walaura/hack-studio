import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { ReactNode } from "react";

export default function Flexbox({
  children,
  direction = "row",
  align = "stretch",
  justify = "center",
  gap = 0,
  xstyle = {},
  wrap = false,
  ...props
}: {
  children: ReactNode;
  direction?: keyof typeof directionStyles;
  align?: keyof typeof alignStyles;
  justify?: keyof typeof justifyStyles;
  gap?: 0 | 4 | 8 | 12 | 16;
  wrap?: boolean;
  xstyle?: StyleXStyles;
}) {
  return (
    <div
      {...stylex.props(
        styles.flexbox(gap),
        directionStyles[direction],
        alignStyles[align],
        justifyStyles[justify],
        wrap && styles.wrap,
        xstyle
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const styles = stylex.create({
  wrap: {
    flexWrap: "wrap",
  },
  flexbox: (gap: number) => ({
    display: "flex",
    gap,
  }),
});

const directionStyles = stylex.create({
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
});

const alignStyles = stylex.create({
  start: {
    alignItems: "flex-start",
  },
  end: {
    alignItems: "flex-end",
  },
  center: {
    alignItems: "center",
  },
  stretch: {
    alignItems: "stretch",
  },
});

const justifyStyles = stylex.create({
  start: {
    justifyContent: "flex-start",
  },
  end: {
    justifyContent: "flex-end",
  },
  center: {
    justifyContent: "center",
  },
  "space-between": {
    justifyContent: "space-between",
  },
  stretch: {
    justifyContent: "stretch",
  },
});
