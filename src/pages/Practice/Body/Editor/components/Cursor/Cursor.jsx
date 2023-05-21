import { css, cx } from "@emotion/css";
import React from "react";

export default function Cursor({ active = false }) {
  return (
    <div
      className={cx(
        "w-[0.5px] h-[65%]",
        "bg-b1",
        active ||
          css`
            @keyframes active {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            animation-name: active;
            animation-duration: 1s;
            animation-iteration-count: infinite;

            animation-timing-function: steps(2, end);
            animation-delay: 300ms;
          `,
        active &&
          css`
            opacity: 1;
          `
      )}
    ></div>
  );
}
