import { css, Interpolation, Theme } from "@emotion/react";
import stylex, { StyleXStyles } from "@stylexjs/stylex";
import { ReactNode } from "react";

type AlignProp = "start" | "end" | "center" | "stretch";

function alignPropToFlexAlign(prop: AlignProp | string): string {
  switch (prop) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    default:
      return prop;
  }
}

const styles = stylex.create({
  flexbox: (
    direction: "row" | "column",
    gap: number,
    align?: AlignProp,
    justify?: AlignProp | "space-between",
  ) => ({
    display: "flex",
    flexDirection: direction,
    gap,
    alignItems: alignPropToFlexAlign(align),
    justifyContent: alignPropToFlexAlign(justify),
  }),
});

export default function Flexbox({
  children,
  direction = "row",
  align = "stretch",
  justify = "center",
  gap = 0,
  xstyle = {},
  ...props
}: {
  children: ReactNode;
  direction?: "row" | "column";
  align?: AlignProp;
  justify?: AlignProp | "space-between"; //not quite but meh
  gap?: 0 | 4 | 8 | 12 | 16;
  css?: Interpolation<Theme>;
  xstyle?: StyleXStyles;
}) {
  if (xstyle) {
    return (
      <div
        {...stylex.props(styles.flexbox(direction, gap, align, justify), xstyle)}
        {...props}
      >
        {children}
      </div>
    )
  }
  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${direction};
        align-items: ${alignPropToFlexAlign(align)};
        justify-content: ${alignPropToFlexAlign(justify)};
        gap: ${gap}px;
      `}
      {...props}
    >
      {children}
    </div>
  );
}
