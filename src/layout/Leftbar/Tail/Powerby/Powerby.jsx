import { cx } from "@emotion/css";
import React from "react";

export default function Powerby() {
  return (
    <div className="flex items-center">
      <p className={cx("text-[12px] text-gray-300 italic")}>
        powered by stuauto 29, 30, 31
      </p>
    </div>
  );
}
