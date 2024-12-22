import stylex from "@stylexjs/stylex";
import { ComponentProps, ReactNode } from "react";
import Text from "./Text";

const styles = stylex.create({
  base: {
    border: "none",
    backgroundColor: "transparent",
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
    backgroundColor: "var(--surface-2)",
  },
  secondary: {
    boxShadow: "inset 0 0 0 1px var(--surface-2)",
  },
  tab: {
    ":hover": {
      boxShadow: "inset 0 0 0 1px var(--surface-2)",
    },
  },
  activeTab: {
    backgroundColor: "var(--surface-2)",
  },
});
const sizeStyles = stylex.create({
  small: {
    padding: "4px 8px",
    borderRadius: 4,
  },
  normal: {
    padding: "8px 12px",
    borderRadius: "9999em",
  },
});

const getTextColor = (type: keyof typeof typeStyles) => {
  if (type === "tab") {
    return "secondary";
  }
  return "primary";
};

const getTextType = (
  type: keyof typeof typeStyles
): ComponentProps<typeof Text>["type"] => {
  if (type === "primary") {
    return "body2emphasis";
  }
};

export default function Button({
  children,
  onClick,
  type = "primary",
  isEnabled = true,
  title,
  size = "normal",
}: {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: keyof typeof typeStyles;
  size?: keyof typeof sizeStyles;
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
        sizeStyles[size],
        !isEnabled && styles.disabled
      )}
    >
      <Text type={getTextType(type)} color={getTextColor(type)}>
        {children}
      </Text>
    </Element>
  );
}
