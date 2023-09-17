import { css, Interpolation, Theme } from "@emotion/react";
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

export default function Flexbox({
  children,
  direction = "row",
  align = "stretch",
  justify = "center",
  gap = 0,
  ...props
}: {
  children: ReactNode;
  direction?: "row" | "column";
  align?: AlignProp;
  justify?: AlignProp | "space-between"; //not quite but meh
  gap?: 0 | 4 | 8 | 12 | 16;
  css?: Interpolation<Theme>;
}) {
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
