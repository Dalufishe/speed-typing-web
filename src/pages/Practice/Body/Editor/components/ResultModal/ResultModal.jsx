import { css, cx } from "@emotion/css";
import { Modal } from "@mui/base";
import React from "react";
import ResultModalTop from "./ResultModalTop/ResultModalTop";
import ResultModalBottom from "./ResultModalBottom/ResultModalBottom";
import ResultModalCenter from "./ResultModalCenter/ResultModalCenter";
import { animated, useSpring } from "@react-spring/web";

export default function ResultModal({ open, setOpen }) {
  const springs = useSpring({
    opacity: open ? 1 : 0.5,
    scale: open ? 1 : 0,
  });

  return (
    <Modal
      open={open}
      className={cx(
        "fixed",
        "w-screen h-screen",
        "top-0 left-0 right-0 bottom-0",
        "flex justify-center items-center",
        css`
          background: rgba(0, 0, 0, 0.5);
        `
      )}
    >
      <animated.div
        style={springs}
        className={cx(
          "w-[1000px] aspect-video",
          "bg-d3",
          "border-t-2 border-l-2 border-m2",
          "outline-none",
          "text-b1 font-mono",
          "p-6",
          "flex flex-col justify-between",
          "rounded-md"
        )}
      >
        {/* Top */}
        <ResultModalTop />
        {/* Center */}
        <ResultModalCenter />
        {/* Bottom */}
        <ResultModalBottom setOpen={setOpen} />
      </animated.div>
    </Modal>
  );
}
