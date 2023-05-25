import { cx } from "@emotion/css";
import React from "react";
import Statusbox from "./Statusbox/Statusbox";
import Trend from "./Trend/Trend";

export default function Body() {
  return (
    <div className={cx("pt-5", "overflow-auto")}>
      <div className={cx("p-3", "bg-d3", "font-mono", "rounded-sm")}>
        {/* title */}
        <p className="text-[32px]">
          您的個人成績{" "}
          <span className="text-[20px]">/ Your personal Score</span>
        </p>
        {/* details */}
        <p className={cx("text-m3")}>
          <span>用戶:訪客</span> / <span>{new Date().toISOString()}</span> /{" "}
          <span>{Math.random()}</span>
        </p>
        {/* status box */}
        <Statusbox />
        {/* trend */}
        <Trend />
      </div>
    </div>
  );
}
