import { cx } from "@emotion/css";
import React from "react";

export default function ResultItem({ title, subtitle, value, unit }) {
  return (
    <div
      className={cx(
        "w-full aspect-square",
        "bg-m1",
        "p-2",
        "rounded-sm shadow-md"
      )}
    >
      {/* heading */}
      <div>
        {/* title & subtitle */}
        <div className={cx("flex items-center gap-2 px-1")}>
          {/* title */}
          <span className="text-[20px] font-bold whitespace-nowrap">
            {title}
          </span>
          {/* subtitle */}
          <span className="text-[16px]">{subtitle}</span>
        </div>
      </div>
      {/* divider */}
      <div className={cx("w-full h-0.5", "bg-m2")}></div>
      {/* value */}
      <div className="flex justify-center py-14">
        <div>
          <span className={cx("text-[72px]")}>{value}</span>{" "}
          <span className={cx("text-[24px]")}>{unit}</span>
        </div>
      </div>
      {/* divider */}
      <div className={cx("w-full h-0.5", "bg-m2")}></div>
    </div>
  );
}
