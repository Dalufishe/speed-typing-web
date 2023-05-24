import React from "react";

import { css, cx } from "@emotion/css";

export default function Button({
  children,
  start,
  end,
  onClick,
  className,
  px = 8,
  py = 8,
  bg = "d1",
  full = false,
}) {
  // tailwind preload
  const _tailwindcss_preload = (
    <div className="bg-d1 bg-d2 bg-d3 bg-m1 bg-m2 bg-m3 bg-b1"></div>
  );

  return (
    <div
      onClick={onClick}
      className={cx(
        "select-none",
        "flex justify-center items-center gap-1",
        "rounded-md",
        "transition-all",
        "shadow-md",
        "cursor-pointer",
        `bg-${bg}`,
        "hover:brightness-110",
        "relative",
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
      <div className="flex justify-center items-center gap-1">{children}</div>
      <div className="absolute right-4">{end}</div>
      <div className="absolute left-4">{start}</div>
    </div>
  );
}
