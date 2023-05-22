import { cx } from "@emotion/css";
import React from "react";

import { AiTwotoneTool } from "react-icons/ai";
import Configbox from "./Configbox/Configbox";
import HistoryStatus from "./HistoryStatus/HistoryStatus";

export default function Rightbar() {
  return (
    <div
      className={cx(
        "w-full h-full",
        "bg-m1",
        "p-0.5",
        "rounded-md",
        "shadow-md",
        "flex flex-col justify-between"
      )}
    >
      <div className={cx("h-full", "flex flex-col")}>
        {/* Configbox */}
        <Configbox />
        {/* HistoryStatus */}
        <div className="flex-grow">
          <HistoryStatus />
        </div>
      </div>
      {/* Tail */}
      <div className={cx("w-full h-[21px]", "bg-d3", "rounded-sm")}></div>
    </div>
  );
}
