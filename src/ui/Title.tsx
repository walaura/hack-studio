import { css } from "@emotion/react";

export default function Title({ children }: { children: string }) {
  return (
    <div>
      <h2
        css={css`
          background: var(--text);
          color: #000;
          display: inline-flex;
          text-transform: uppercase;
          font-weight: 600;
          padding: 2px 6px;
          font-size: 1.2rem;
        `}
      >
        {children}
      </h2>
    </div>
  );
}
