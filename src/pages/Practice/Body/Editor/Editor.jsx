import { cx } from "@emotion/css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Cursor from "./components/Cursor/Cursor";
import { useTyping } from "./hooks/useTyping";
import Topbar from "./components/Topbar/Topbar";

import { connect } from "react-redux";
import { set_typing_data } from "../../../../redux/action/set_typing_data.act";
import { set_is_start_PERSIST } from "../../../../redux/action/set_is_start_Persist.act";

import Tail from "./components/Tail/Tail";

import rollingGif from "./assets/Rolling-1s-200px.gif";
import Detail from "./components/Detail/Detail";
import { useStartTyping } from "./hooks/useStartTyping";
import { useEndTyping } from "./hooks/useEndTyping";
import { Modal } from "@mui/base";
import ResultModal from "./components/ResultModal/ResultModal";

function Editor({ typing_data, set_typing_data, hint, set_is_start_PERSIST }) {
  // get data
  const { head_article, tail_article } = typing_data;
  // typing or not, use to handle animation of cursor
  const [typing] = useTyping();
  /* 
  判斷打字階段
  "not-yet": 還沒開始打字 
  "just-start": 剛開始打字
  "typing": 打字超過 2 秒 
  "end": 結束打字
  */
  const [typingState, setTypingState] = useState("not-yet");
  const _typing_state_typing_timeout = useRef();

  /* 成績結算視窗彈出 */

  const [isResultPopup, setIsResultPopup] = useState(false);

  // 開始時按鍵輸入迴圈函式
  const handleStartLoop = useCallback((t) => {
    // 渲染更新
    set_typing_data(t);
  }, []);

  // 測驗結束時執行
  const handleEnd = useCallback(() => {
    typing_data.end_race(() => {
      // set_is_start, control page-reload DNF
      set_is_start_PERSIST(false);
      // typing-hint
      setTypingState("end");
      clearTimeout(_typing_state_typing_timeout.current);
      // 彈出結算視窗
      setIsResultPopup(true);
      // 長按 space 重新開始
      let spaceCount = 0;
      document.addEventListener("keydown", (evt) => {
        if (evt.key === " ") {
          // 關闢結束視窗
          setIsResultPopup(false);
          spaceCount++;
        }
        if (spaceCount > 5) {
          window.location.reload();
        }
      });
    });
  }, []);

  // 開始時初始化函式
  const handleStartInit = useCallback(() => {
    // typing-hint
    setTypingState("just-start");
    _typing_state_typing_timeout.current = setTimeout(() => {
      setTypingState("typing");
    }, 2000);
    // set_is_start, control page-reload DNF
    set_is_start_PERSIST(true);
    // 渲染更新
    set_typing_data(typing_data);
    // 開始測試
    typing_data.start_race(handleStartLoop, handleEnd);
  }, []);
  // 結束時執行

  // useStartTyping : 當輸入任意建, 即...
  useStartTyping(
    useCallback(() => {
      handleStartInit();
      handleStartLoop();
    }),
    []
  );

  // useStartTyping: 當輸入 esc , 即...
  useEndTyping(
    useCallback(() => {
      if (typing_data.is_start) {
        handleEnd();
      }
    }),
    [typing_data.is_start]
  );

  return (
    <>
      <ResultModal open={isResultPopup} setOpen={setIsResultPopup} />
      <div className={cx("bg-d3", "p-0.5", "rounded-md", "shadow-md")}>
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
            "flex justify-center items-center",
            "relative"
          )}
        >
          {/* Typing Area Main Part */}
          <div
            className={cx(
              "w-[99%] h-[63px]",
              "bg-d3",
              "brightness-125",
              "shadow-lg",
              "flex justify-center items-center"
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
                      className={cx(
                        hint && (correct ? "text-blue-400" : "text-red-600")
                      )}
                    >
                      {(function () {
                        if (!correct && char === " ") {
                          return "_";
                        } else {
                          return char;
                        }
                      })()}
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
                          按住並放開 <u> Space</u> ...
                        </>
                      );
                    case "just-start":
                      return (
                        <>
                          <div>開始！</div>
                        </>
                      );
                    case "typing":
                      return <></>;
                    case "end":
                      return (
                        <>
                          <div>
                            長按 <u>Space</u> 重新開始
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
          {/* typing details */}
          <div className={cx("absolute bottom-0", "w-full h-[21px]")}>
            <Detail />
          </div>
        </div>
        {/* editor-tail */}
        <div className="h-[21px]">
          <Tail />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    typing_data: state.typing_data.data,
    hint: state.hint_or_not.hint,
    id: state.typing_data._id,
  };
};

const mapDispatchToProps = {
  set_typing_data,
  set_is_start_PERSIST,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
