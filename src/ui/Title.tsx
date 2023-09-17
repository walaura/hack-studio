import { css } from "@emotion/react";

const titleStyles = {
  strong: css`
    background: var(--text);
    color: #000;
  `,
  light: css``,
};

export default function Title({
  children,
  style = "strong",
}: {
  children: string;
  style?: "strong" | "light";
}) {
  return (
    <div
      css={css`
        margin: -4px -4px;
      `}
    >
      <h2
        css={css`
          ${titleStyles[style]}
          display: inline-flex;
          text-transform: uppercase;
          font-weight: 600;
          padding: 2px 4px;
          margin: 0;
          font-size: 1.2rem;
        `}
      >
        {children}
      </h2>
    </div>
  );
}
