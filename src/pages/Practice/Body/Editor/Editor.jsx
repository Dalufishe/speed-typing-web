import { cx } from "@emotion/css";
import React from "react";
import Topbar from "./Topbar/Topbar";

export default function Editor() {
  return (
    <div className={cx("bg-d3", "p-0.5", "flex", "rounded-md", "shadow-md")}>
      <div className="flex-grow">
        {/* editor-topbar */}
        <div className={cx("h-[28px]")}>
          <Topbar />
        </div>
        {/* Typing Area */}
        <div
          className={cx(
            "h-[315px]",
            "bg-d3",
            "text-[150%] font-mono",
            "flex justify-center items-center"
          )}
        >
          {/* Typing Area Main Part */}
          <div
            className={cx(
              "w-full h-[63px]",
              "bg-d3",
              "brightness-125",
              "shadow-lg",
              "flex"
            )}
          >
            {/* Left - typed */}
            <div className={cx("w-[33%]")}></div>
            {/*  */}
            {/* Right - going to type */}
            <div
              className={cx(
                "w-[66%]",
                "flex items-center",
                "whitespace-nowrap",
                "overflow-hidden"
              )}
            >
              <p className={cx("w-full")}>
                Lorem ipsum dolor sit amet consectetur adipisic
              </p>
            </div>
          </div>
          {/*  */}
        </div>
        {/* editor-tail */}
        <div className={cx("h-[21px]", "bg-m1", "rounded-sm")}></div>
      </div>
    </div>
  );
}
