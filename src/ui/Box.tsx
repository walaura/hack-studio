import { css } from "@emotion/react";
import { ReactNode } from "react";

export default function Box({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        border: 1px solid var(--divider);
        padding: 8px;
      `}
    >
      {children}
    </div>
  );
}
