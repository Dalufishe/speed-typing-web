import { css, cx } from "@emotion/css";
import React, { useCallback } from "react";
import { tailwindcssConfig } from "../../../../../config/tailwind-js.config";
import { connect } from "react-redux";

import turtleIcon from "./assets/turtle.png";

const BestScoreItem = ({ children, className }) => {
  return (
    <div
      className={cx(
        "w-full h-[84px]",
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
      {children}
    </div>
  );
};

const HistoryStatusItem = ({ left, center, right }) => {
  return (
    <div
      className={cx(
        " px-2",
        "w-full h-[63px]",
        "flex items-center justify-between",
        "border-2 border-d3 border-t-0"
      )}
    >
      <div>{left}</div>
      <div className="flex justify-end gap-5">
        <div>{center}</div>
        <div className="font-bold w-9">{right}</div>
      </div>
    </div>
  );
};

function HistoryStatus({ history_data }) {
  // fns
  const handleLeft = useCallback(function ({ index }) {
    let time = new Date().toISOString();
    time = time.slice(0, time.indexOf("T"));
    let count = history_data.length;
    return time + ` [${count - index}]`;
  });
  const handleCenter = useCallback(function ({
    spanning,
    wpm,
    time_remaining,
    index,
  }) {
    const previous = history_data[index + 1];
    let subtract;
    if (
      // 當下並未 DNF
      spanning - time_remaining === spanning &&
      // 上輪並未 DNF
      previous?.spanning - previous?.time_remaining === previous?.spanning
    ) {
      subtract = wpm - previous?.wpm;
      subtract = subtract.toFixed(1);
    } else if (
      // 當下並未 DNF
      spanning - time_remaining === spanning &&
      // 上輪 DNF
      previous?.spanning - previous?.time_remaining != previous?.spanning
    ) {
      subtract = wpm;
    } else {
      subtract = 0;
    }
    // 第一次不計
    if (index === history_data.length - 1) subtract = "";
    return subtract;
  });
  const handleRight = useCallback(function ({ spanning, wpm, time_remaining }) {
    return spanning - time_remaining === spanning ? wpm.toFixed(1) : "DNF";
  });

  const getBestScore = useCallback(() => {
    let highest;
    if (
      history_data[0]?.spanning - history_data[0]?.time_remaining ===
      history_data[0]?.spanning
    ) {
      highest = history_data[0]?.wpm;
    } else {
      highest = 0;
    }
    for (let i = 1; i < history_data.length; i++) {
      if (history_data[i]?.wpm > highest) {
        // not DNF
        if (
          history_data[i].spanning - history_data[i].time_remaining ===
          history_data[i].spanning
        ) {
          highest = history_data[i]?.wpm;
        }
      }
    }

    return highest;
  });
  return (
    <div className={cx("h-full", "relative", "text-[16px]", "font-mono")}>
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
        <div className={cx("w-full", "flex justify-between items-center")}>
          <div>歷史紀錄</div>
          <div className="flex justify-around items-center gap-5 px-2">
            <div className="text-m3">w/m</div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div
        className={cx(
          "overflow-auto",
          css`
            height: calc(100% - 21px - 90px);
          `
        )}
      >
        {history_data.map(({ wpm, time_remaining, spanning }, index) => (
          <HistoryStatusItem
            key={Math.random()}
            left={(() => {
              return handleLeft({ index });
            })()}
            center={(() => {
              const result = handleCenter({
                wpm,
                time_remaining,
                spanning,
                index,
              });
              return result >= 0 ? (
                <span className="text-blue-400">{result}</span>
              ) : (
                <span className="text-red-400">{result}</span>
              );
            })()}
            right={(() => {
              return handleRight({ wpm, time_remaining, spanning });
            })()}
          />
        ))}
      </div>
      {/* Bottom */}
      <div className={cx("absolute bottom-0", "w-full")}>
        {/* Best */}
        <BestScoreItem className="bg-m2 border-t-2">
          <div className="flex items-center gap-2">
            <img src={turtleIcon} className="w-20" />
            <div className="translate-y-0.5">
              <div className="text-[16px] translate-y-1">
                {(function () {
                  const bestscore = getBestScore();
                  if (bestscore < 10) return "蝸牛";
                  if (bestscore < 20) return "烏龜";
                  if (bestscore < 30) return "兔子";
                  if (bestscore < 30) return "貓";
                  if (bestscore < 50) return "獵豹";
                  if (bestscore < 60) return "鯊魚";
                })()}
              </div>
              <div className="text-[32px] font-bold text-blue-300 flex gap-2 items-center">
                {getBestScore()}.0
                <span className="text-[16px] translate-y-1">w/m</span>
              </div>
            </div>
          </div>
        </BestScoreItem>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    history_data: state.history_data.data,
  };
};

export default connect(mapStateToProps)(HistoryStatus);
