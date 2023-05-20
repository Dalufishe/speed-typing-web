import { css, cx } from "@emotion/css";
import React from "react";
import Cursor from "./Cursor/Cursor";
import { useTyping } from "./useTyping";
import Topbar from "./Topbar/Topbar";

import { connect } from "react-redux";
import { set_typing_data } from "../../../../redux/action/set_typing_data.act";
import { useTypingSystem } from "../../../../core/hooks/useTypingSystem";
import Tail from "./Tail/Tail";

function Editor({ set_typing_data, typing_data }) {
  // boolean, typing or not
  const [typing] = useTyping();
  const { head_article, tail_article } = typing_data;

  // react-hook connect to TypingSystem api
  useTypingSystem(
    {
      article:
        "The default article what really happened to Steve Job in 2011 The default article what really happened to Steve Job in 2011 The default article what really happened to Steve Job in 2011 The default article what really happened to Steve Job in 2011 The default article what really happened to Steve Job in 2011 The default article what really happened to Steve Job in 2011",
      spanning: 30,
    },
    (t) => {
      set_typing_data(t);
    }
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
                    key={Math.random()}
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
                {tail_article.map(({ char }) => (
                  <span key={Math.random()}>{char}</span>
                ))}
              </pre>
            </div>
          </div>
          {/*  */}
        </div>
        {/* editor-tail */}
        <div className="h-[21px]">
          <Tail />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    typing_data: state.typing_data.data,
  };
};

const mapDispatchToProps = {
  set_typing_data,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
