import React from "react";
import { cx } from "@emotion/css";

export default function RecentItem({ title, subtitle }) {
  return (
    <div
      className={cx("w-full aspect-video", "bg-m1", "rounded-sm", "pt-2 px-2")}
    >
      {/* title */}
      <p className="text-[16px]">
        {title} <span className="text-[12px]">{subtitle}</span>
      </p>
      {/* divider */}
      <div className={cx("w-full h-0.5", "bg-m2")}></div>
      {/* value */}
      <div className={cx("flex items-center")}>
        <div className="text-[40px]">48</div>
        <div className="text-[20px]">{">"}</div>
        <div className="text-[20px]">38</div>
      </div>
    </div>
  );
}
