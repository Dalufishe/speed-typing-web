import { css, cx } from "@emotion/css";
import React from "react";
import Cursor from "./Cursor/Cursor";
import { useTyping } from "./useTyping";
import TypingSystem from "../../../../core/TypingSystem";
import Topbar from "./Topbar/Topbar";
import { useTypingSystem } from "../../../../core/hooks/useTypingSystem";

export default function Editor() {
  // boolean, typing or not
  const [typing] = useTyping();

  // hook connect to the TypingSystem core api
  const [head_article, tail_article] = useTypingSystem(
    new TypingSystem({
      spanning: 60,
    }),
    (t) => {}
  );

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
              "h-[63px]",
              "bg-d3",
              "brightness-125",
              "shadow-lg",
              "flex items-center",
              css`
                width: calc(100vw - 300px - 20px - 20px);
              `
            )}
          >
            {/* Left - typed */}
            <div
              className={cx(
                "w-[33%]",
                "flex items-center justify-end",
                "whitespace-nowrap",
                "overflow-hidden"
              )}
            >
              <pre className={cx("w-fit")}>
                {head_article.map(({ char, correct }) => (
                  <span
                    className={cx(correct ? "text-blue-400" : "text-red-600")}
                  >
                    {char}
                  </span>
                ))}
              </pre>
            </div>
            {/* Center - cursor */}
            <Cursor active={typing} />
            {/* Right - going to type */}
            <div
              className={cx(
                "w-[66%]",
                "flex justify-start items-center",
                "whitespace-nowrap",
                "overflow-hidden"
              )}
            >
              <pre className={cx("w-full")}>
                {tail_article.map(({ char }) => char)}
              </pre>
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
