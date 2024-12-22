import stylex, { StyleXStyles } from "@stylexjs/stylex";

export default function Divider({ xstyle }: { xstyle?: StyleXStyles }) {
  return <div {...stylex.props(styles.divider, xstyle)} />;
}

const styles = stylex.create({
  divider: {
    borderBottom: "1px solid var(--surface-2)",
  },
});
