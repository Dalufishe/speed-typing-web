import { css, cx } from "@emotion/css";
import React from "react";
import turtleIcon from "./assets/turtle.png";

import { tailwindcssConfig } from "../../../../../config/tailwind-js.config";

const HistoryStatusItem = ({ title, className }) => {
  return (
    <div
      className={cx(
        "w-full h-[90px]",
        "border-2 border-d3 border-t-0",
        "flex items-center justify-between px-2",
        css`
          background: linear-gradient(
                135deg,
                transparent 15px,
                ${tailwindcssConfig.theme.colors.m2} 0
              )
              top left,
            linear-gradient(
                -135deg,
                transparent 0px,
                ${tailwindcssConfig.theme.colors.m2} 0
              )
              top right,
            linear-gradient(
                -45deg,
                transparent 15px,
                ${tailwindcssConfig.theme.colors.m2} 0
              )
              bottom right,
            linear-gradient(
                45deg,
                transparent 0px,
                ${tailwindcssConfig.theme.colors.m2} 0
              )
              bottom left;
          background-size: 50% 50%;
          background-repeat: no-repeat;
        `,
        className
      )}
    >
      {title}
    </div>
  );
};

export default function HistoryStatus() {
  return (
    <>
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
          <div>歷史紀錄</div>
        </div>
      </div>
      {/* Content */}
      <div className={cx("flex-grow")}>
        <HistoryStatusItem
          className="bg-m2"
          title={
            <div className="flex items-center gap-2">
              <img src={turtleIcon} className="w-20" />
              <div className="translate-y-0.5">
                <div className="text-[12px] italic">5 w/m ~ 10 w/m</div>
                <div className="text-[24px] font-bold">烏龜</div>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
