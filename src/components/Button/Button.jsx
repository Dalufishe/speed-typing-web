import React from "react";

import { css, cx } from "@emotion/css";

export default function Button({
  children,
  onClick,
  className,
  px = 8,
  py = 8,
  bg = "d1",
  full = false,
}) {
  const _tailwindcss_preload = (
    <div className="bg-d1 bg-d2 bg-d3 bg-m1 bg-m2 bg-m3 bg-b1"></div>
  );

  return (
    <div
      onClick={onClick}
      className={cx(
        "flex justify-center items-center gap-1",
        "rounded-md",
        "transition-all",
        "shadow-md",
        "cursor-pointer",
        `bg-${bg}`,
        "hover:brightness-110",
        css`
          padding-right: ${px}px;
          padding-left: ${px}px;
          padding-top: ${py}px;
          padding-bottom: ${py}px;
          ${full && "width: 100%;"}
        `,
        className
      )}
    >
      {children}
    </div>
  );
}
