import { css } from "@emotion/react";
import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      css={css`
        background: var(--highlight);
        padding: 16px;
        border: none;
        cursor: pointer;
        opacity: 0.9;
        &:hover {
          opacity: 1;
        }
      `}
    >
      {children}
    </button>
  );
}
