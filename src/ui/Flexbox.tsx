import { css } from "@emotion/react";
import { ReactElement, ReactNode } from "react";

type AlignProp = "start" | "end" | "center" | 'stretch';

function alignPropToFlexAlign(prop: AlignProp): string {
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
  gap = 0,
}: {
  children: ReactNode;
  direction?: "row" | "column";
  align?: AlignProp;
  gap: 0 | 4 | 8 | 12;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${direction};
        align-items: ${alignPropToFlexAlign(align)};
        gap: ${gap}px;
      `}
    >
      {children}
    </div>
  );
}
