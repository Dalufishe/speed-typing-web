import { cx } from "@emotion/css";
import React from "react";

import { AiTwotoneTool } from "react-icons/ai";

const ConfigItem = ({ title }) => {
  return (
    <div
      className={cx(
        "w-full h-[82px]",
        "border-2 border-d3 border-t-0",
        "flex items-center justify-between px-2"
      )}
    >
      {title}
    </div>
  );
};

export default function Configbox() {
  return (
    <div>
      {/* Top */}
      <div
        className={cx(
          "w-full h-[28px]",
          "bg-d3",
          "rounded-sm",
          "text-[15px]",
          "flex justify-between items-center",
          "text-[14px]",
          "px-2"
        )}
      >
        <div className={cx("flex items-center gap-1")}>
          <AiTwotoneTool />
          <div>配置欄</div>
        </div>
      </div>
      {/* Content */}
      <div className={cx("flex-grow")}>
        {/* spanning Time */}
        <ConfigItem title="練習時間" />
        <ConfigItem title="是否提示" />
        <ConfigItem title="字體種類" />
        <ConfigItem title="字體大小" />
      </div>
    </div>
  );
}
