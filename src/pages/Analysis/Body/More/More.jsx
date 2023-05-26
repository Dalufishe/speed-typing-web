import React from "react";
import { cx } from "@emotion/css";
import DnfRate from "./DnfRate/DnfRate";
import Accuracy from "./Accuracy/Accuracy";
import Heading2 from "../../components/Heading2";

export default function More() {
  return (
    <div>
      {/* Top */}
      <Heading2 title={"其他統計"} subtitle={"More"} />
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
