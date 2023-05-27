import { cx } from "@emotion/css";
import React from "react";
import Button from "../Button/Button";
import { animated, useSpring } from "@react-spring/web";

export default function PopupHint({ children }) {
  const springs = useSpring({
    from: {
      opacity: 0.5,
      y: 16,
    },
    to: {
      opacity: 1,
      y: 0,
    },
  });

  return (
    <animated.div
      style={springs}
      className={cx(
        "fixed bottom-6 left-[50%] translate-x-[-50%]",
        "text-b1 font-mono"
      )}
    >
      <Button bg="d3" px={24} className={cx("rounded-xl", "border border-m2")}>
        {children}
      </Button>
    </animated.div>
  );
}
