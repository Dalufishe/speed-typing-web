import { cx, css } from "@emotion/css";
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
      <div className={cx("h-full", "overflow-hidden", "flex flex-col")}>
        {/* Configbox */}
        <div className="h-[356px]">
          <Configbox />
        </div>
        {/* HistoryStatus */}
        <div
          className={css`
            height: calc(100% - 356px);
          `}
        >
          <HistoryStatus />
        </div>
      </div>
    </div>
  );
}
