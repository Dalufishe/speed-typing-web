import React from "react";
import { cx } from "@emotion/css";
import DnfRate from "./DnfRate/DnfRate";
import Accuracy from "./Accuracy/Accuracy";

export default function More() {
  return (
    <div>
      {/* Top */}
      <div
        className={cx(
          "text-[24px]",
          "mb-2",
          "flex items-center justify-between"
        )}
      >
        <p>
          其他統計 <span className="text-[16px]"> / More</span>
        </p>
      </div>
      {/* Content */}
      <div className="flex gap-6">
        <div className={cx("w-[50%]")}>
          {/* accuracy */}
          <Accuracy />
        </div>
        <div className={cx("w-[50%]")}>
          {/* DNF rate */}
          <DnfRate />
        </div>
      </div>
    </div>
  );
}
