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
      <div>
        {/* Configbox */}
        <Configbox />
        {/* HistoryStatus */}
        <HistoryStatus />
      </div>
      {/* Tail */}
      <div className={cx("w-full h-[21px]", "bg-d3", "rounded-sm")}></div>
    </div>
  );
}
