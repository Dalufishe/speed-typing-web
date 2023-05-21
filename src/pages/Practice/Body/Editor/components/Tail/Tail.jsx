import { cx } from "@emotion/css";
import React from "react";
import { TbPlug } from "react-icons/tb";

export default function Tail() {
  return (
    <div className={cx("h-full", "bg-m1", "rounded-sm", "flex items-center")}>
      <div
        className={cx(
          "px-2 text-m3 text-[14px]",
          "flex items-center gap-1",
          "overflow-hidden"
        )}
      >
        <TbPlug />
        <p className="whitespace-nowrap">
          你尚未安裝任何插件. 拜訪{" "}
          <a className="italic underline" href=".">
            speedtyping.com/plugin
          </a>{" "}
          以獲取各式插件以增添功能及打字體驗。
        </p>
      </div>
    </div>
  );
}
