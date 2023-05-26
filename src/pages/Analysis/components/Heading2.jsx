import React from "react";
import {cx} from "@emotion/css"

export default function Heading2({title, subtitle, extend}) {
  return (
    <div
      className={cx("text-[24px]", "mb-2", "flex items-center justify-between")}
    >
      <p>
        {title} <span className="text-[16px]"> / {subtitle}</span>
      </p>
      {extend}
    </div>
  );
}
