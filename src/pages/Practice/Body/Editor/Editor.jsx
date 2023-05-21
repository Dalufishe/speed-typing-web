import { css, cx } from "@emotion/css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Cursor from "./components/Cursor/Cursor";
import { useTyping } from "./hooks/useTyping";
import Topbar from "./components/Topbar/Topbar";

import { connect } from "react-redux";
import { set_typing_data } from "../../../../redux/action/set_typing_data.act";
import { useTypingSystem } from "../../../../core/hooks/useTypingSystem";
import Tail from "./components/Tail/Tail";
import { article_generator } from "./utils/article_generator";
import { useStartTyping } from "./hooks/useStartTyping";
import { useEndTyping } from "./hooks/useEndTyping";

import rollingGif from "./assets/Rolling-1s-200px.gif";

function Editor({
  typing_data,
  set_typing_data,
  /* render immediatly */
  _id,
}) {
  // get data
  const { head_article, tail_article } = typing_data;
  // boolean, typing or not
  const [typing] = useTyping();
  // react-hook connect to TypingSystem api
  const [setStart, setEnd] = useTypingSystem(
    {
      article: article_generator(1000),
      spanning: 60,
    },
    (t) => {
      set_typing_data(t);
    }
  );
  /* 
  判斷打字階段
  "not-yet": 還沒開始打字 
  "just-start": 剛開始打字
  "typing": 打字超過 2 秒 
  "end": 結束打字
  */
  const [typingState, setTypingState] = useState("not-yet");

  const _typing_state_typing_timeout = useRef();

  // 當 鍵入 即開始
  useStartTyping(setStart, () => {
    setTypingState("just-start");
    _typing_state_typing_timeout.current = setTimeout(() => {
      setTypingState("typing");
    }, 2000);
  });
  // 當 esc 即結束
  useEndTyping(setEnd, () => {
    setTypingState("end");
    clearTimeout(_typing_state_typing_timeout.current);
    // 判斷重新開始
    let spaceCount = 0;
    document.addEventListener("keydown", (evt) => {
      if (evt.key === " ") {
        spaceCount++;
      }
      if (spaceCount > 5) {
        window.location.reload();
      }
    });
  });

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
                {/* 提升效能 : 只擷取片段文章渲染 */}
                {head_article
                  .slice(
                    head_article.length - 40 > 0 ? head_article.length - 40 : 0,
                    head_article.length
                  )
                  .map(({ char, correct }) => (
                    <span
                      key={Math.random()}
                      className={cx(correct ? "text-blue-400" : "text-red-600")}
                    >
                      {char}
                    </span>
                  ))}
              </pre>
            </div>
            {/* Center */}
            <div
              className={cx(
                "h-full",
                "flex justify-center items-center",
                "relative"
              )}
            >
              {/* typing message */}
              <div
                className={cx(
                  "absolute",
                  "whitespace-nowrap",
                  "text-[16px] top-[-32px] text-m3",
                  "flex gap-1 items-center"
                )}
              >
                {(function () {
                  switch (typingState) {
                    case "not-yet":
                      return (
                        <>
                          <img src={rollingGif} className="w-4" />
                          輸入任意鍵開始...
                        </>
                      );
                    case "just-start":
                      return (
                        <>
                          <div>開始打字！</div>
                        </>
                      );
                    case "typing":
                      return <></>;
                    case "end":
                      return (
                        <>
                          <div>
                            按 <u>Space</u> 重新開始
                          </div>
                        </>
                      );
                  }
                })()}
              </div>
              {/* cursor */}
              <Cursor active={typing} />
            </div>
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
                {/* 提升效能 : 只擷取片段文章渲染 */}
                {tail_article.slice(0, 80).map(({ char }) => char)}
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
    id: state.typing_data._id,
  };
};

const mapDispatchToProps = {
  set_typing_data,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
