import stylex from "@stylexjs/stylex";
import React, { useEffect } from "react";

const styles = stylex.create({
  active: {
    backgroundColor: "var(--surface-4)",
    boxShadow: "none",
  },
  trigger: {
    display: "contents",
  },
  root: {
    display: "contents",
    position: "relative",
  },
  popover: {
    position: "absolute",
    backgroundColor: "var(--surface-4)",
    border: "none",
    borderRadius: ".4em",
    padding: 20,
  },
});

export default function Popover({
  children,
  popover,
  isActive = true,
}: {
  children: React.ReactNode;
  popover: React.ReactNode;
  isActive?: boolean;
}) {
  const id = Date.now() + "-" + Math.random();
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const targetRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    popoverRef.current.addEventListener("beforetoggle", (e) => {
      const position = targetRef.current.children[0].getBoundingClientRect();
      (e.target as HTMLElement).style.transform = `
        translate(${position.left}px, ${position.bottom}px)`;
    });
  }, []);
  return (
    <div {...stylex.props(styles.root)}>
      <button
        //@ts-expect-error popovertarget is a valid attribute
        popovertarget={isActive ? id : null}
        popovertargetaction="toggle"
        {...stylex.props(styles.trigger)}
        ref={targetRef}
      >
        {children}
      </button>
      <div
        ref={popoverRef}
        id={id}
        //@ts-expect-error popovertarget is a valid attribute
        popover="auto"
        {...stylex.props(styles.popover)}
      >
        {popover}
        {/*@ts-expect-error popovertarget is a valid attribute*/}
        <button popovertarget={id} popovertargetaction="close">
          Close
        </button>
      </div>
    </div>
  );
}
