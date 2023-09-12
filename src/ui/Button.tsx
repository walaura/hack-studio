import { css } from "@emotion/react";
import { ReactNode } from "react";

const buttonStyles = {
  primary: css`
    background: var(--highlight);
    border: 1px solid var(--highlight);
  `,
  secondary: css`
    border: 1px solid var(--text);
    background: none;
    color: var(--text);
  `,
};

export default function Button({
  children,
  onClick,
  style = "primary",
}: {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style: keyof typeof buttonStyles;
}) {
  return (
    <button
      onClick={onClick}
      css={css`
        padding: 8px;
        border: none;
        cursor: pointer;
        font-weight: bold;
        opacity: 0.75;
        ${buttonStyles[style]}
        &:hover {
          opacity: 1;
        }
      `}
    >
      {children}
    </button>
  );
}
