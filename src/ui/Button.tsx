import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

const styles = stylex.create({
  primary: {
    background: "var(--highlight)",
    color: "var(--background)",
    border: "1px solid var(--highlight)",
  },
});

export default function Button({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const Element = onClick ? "button" : "div";

  return (
    <Element
      // @ts-ignore
      onClick={onClick}
      {...stylex.props(styles.primary)}
    >
      {children}
    </Element>
  );
}
