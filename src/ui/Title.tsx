import { css } from "@emotion/react";

export default function Title({ children }: { children: string }) {
  return (
    <div
      css={css`
        margin: -4px -4px;
      `}
    >
      <h2
        css={css`
          background: var(--text);
          color: #000;
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
