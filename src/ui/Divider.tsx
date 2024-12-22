import stylex from "@stylexjs/stylex";

export default function Divider() {
  return <div {...stylex.props(styles.divider)} />;
}

const styles = stylex.create({
  divider: {
    borderBottom: "1px solid var(--surface-2)",
  },
});
