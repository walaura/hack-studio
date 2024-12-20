import stylex from "@stylexjs/stylex";
import React, { useEffect } from "react";
import { BsX } from "react-icons/bs";

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
  closeButton: {
    top: 8,
    right: 8,
    position: "absolute",
    appearance: "none",
    border: "none",
    background: "transparent",
    cursor: "pointer",
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
        translate(${position.left}px, ${position.bottom + 4}px)`;
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
        <button
          {...stylex.props(styles.closeButton)}
          /*  @ts-expect-error popovertarget is a valid attribute */
          popovertarget={id}
          popovertargetaction="close"
        >
          <BsX fill="var(--text-primary)" size={20} />
        </button>
        {popover}
      </div>
    </div>
  );
}
