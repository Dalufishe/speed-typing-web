import { css, cx } from "@emotion/css";
import React from "react";

import { RiKeyboardBoxFill } from "react-icons/ri";

export default function Title() {
  return (
    <div
      className={cx("py-5", "leading-6", "flex justify-between items-center")}
    >
      <div>
        {/* Logo */}
        <h2 className={cx("text-[20px]", "font-bold")}>Speed Typing Web</h2>
        {/* Slogan */}
        <p className={cx("text-[12px]", "italic")}>
          Type Faster, Improve Together.
        </p>
      </div>
      {/* Icon */}
      <div
        className={css`
          transition: transform 0.3s ease-out;
          &:hover {
            transform: rotate(23deg);
          }
        `}
      >
        <RiKeyboardBoxFill className={cx("text-[40px] text-m3")} />
      </div>
    </div>
  );
}
