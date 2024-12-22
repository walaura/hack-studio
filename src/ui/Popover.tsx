import stylex from "@stylexjs/stylex";
import React, { useEffect } from "react";

import Box from "./Box";
import Flexbox from "./Flexbox";
import Margin from "./Margin";
import { FaXmark } from "react-icons/fa6";
import Button from "./Button";
import Divider from "./Divider";

const styles = stylex.create({
  trigger: {
    display: "contents",
  },
  root: {
    display: "contents",
    position: "relative",
  },
  popover: {
    position: "absolute",
    backgroundColor: "transparent",
    border: "none",
    overflow: "visible",
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
        <Box elevation={0}>
          <Flexbox direction="row" justify="end">
            <Button
              type="empty"
              onClick={() => {}}
              buttonProps={{
                popovertarget: id,
                popovertargetaction: "close",
              }}
            >
              <FaXmark fill="var(--text-primary)" size={"1em"} />
            </Button>
          </Flexbox>
          <Divider />
          <Flexbox direction="column" xstyle={Margin.all16}>
            {popover}
          </Flexbox>
        </Box>
      </div>
    </div>
  );
}
