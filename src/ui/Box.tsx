import { css, Interpolation, Theme } from "@emotion/react";
import { ReactNode } from "react";

export default function Box({
  children,
  noPadding,
  ...props
}: {
  children: ReactNode;
  noPadding?: true;
  css?: Interpolation<Theme>;
}) {
  return (
    <div
      css={css`
        overflow: auto;
        border: 1px solid var(--divider);
        padding: ${noPadding ? 0 : "16px"};
      `}
      {...props}
    >
      {children}
    </div>
  );
}
