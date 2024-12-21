import stylex from "@stylexjs/stylex";
import { ReactNode } from "react";
import Text from "./Text";

const styles = stylex.create({
  base: {
    padding: ".6em 1.2em",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: "9999em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});
const typeStyles = stylex.create({
  primary: {
    backgroundColor: "var(--surface-1)",
  },
  secondary: {
    boxShadow: "inset 0 0 0 2px var(--surface-1)",
  },
  tab: {
    ":hover": {
      boxShadow: "inset 0 0 0 2px var(--surface-1)",
    },
  },
  activeTab: {
    backgroundColor: "var(--surface-1)",
  },
});

const getTextColor = (type: keyof typeof typeStyles) => {
  if (type === "tab") {
    return "secondary";
  }
  return "primary";
};

export default function Button({
  children,
  onClick,
  type = "primary",
  isEnabled = true,
  title,
}: {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: keyof typeof typeStyles;
  isEnabled?: boolean;
  title?: string;
}) {
  const Element = onClick ? "button" : "div";

  return (
    <Element
      title={title}
      disabled={!isEnabled}
      // @ts-expect-error onclick on div
      onClick={isEnabled ? onClick : null}
      {...stylex.props(
        styles.base,
        typeStyles[type],
        !isEnabled && styles.disabled
      )}
    >
      <Text color={getTextColor(type)}>{children}</Text>
    </Element>
  );
}
