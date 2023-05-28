import { css, cx } from "@emotion/css";
import React, { useCallback, useState } from "react";
import { tailwindcssConfig } from "../../../../../config/tailwind-js.config";
import { connect } from "react-redux";
import Button from "../../../../../components/Button/Button";
import { Link } from "react-router-dom";

import turtleIcon from "./assets/turtle.png";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ROUTE } from "../../../../../constant/route.const";

const BestScoreItem = ({ children, className }) => {
  return (
    <div
      className={cx(
        "w-full h-[84px]",
        "border-2 border-d3 border-t-0",
        "flex items-center justify-between px-2",
        css``,
        className
      )}
    >
      {children}
    </div>
  );
};

const HistoryStatusItem = ({ left, center, right, onClick }) => {
  return (
    <div
      onClick={onClick}
      title={`查看更多關於 ${left}`}
      className={cx(
        "px-2",
        "w-full h-[63px]",
        "flex items-center justify-between",
        "border-2 border-d3 border-t-0",
        "bg-m1 hover:bg-m2",
        "cursor-pointer"
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
  // hooks
  const history = useHistory();
  // states
  const [status, setStatus] = useState("BEST");
  // fns
  const handleLeft = useCallback(function ({ index }) {
    let time = new Date(history_data[index].start_time).toLocaleString();
    time = time.slice(0, time.indexOf(" "));
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
      // 當下 DNF
      subtract = "DNF";
    }
    // 第一次不計
    if (index === history_data.length - 1) subtract = "";
    return subtract;
  });
  const handleRight = useCallback(function ({ spanning, wpm, time_remaining }) {
    return spanning - time_remaining === spanning ? wpm.toFixed(1) : "DNF";
  });
  const getBestScore = useCallback(() => {
    let highest = 0;
    for (let i = 0; i < history_data.length; i++) {
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
  const getAverageScore = useCallback(() => {
    let sum = 0;
    let count = 0;

    for (let i = 0; i < history_data.length; i++) {
      if (
        // 並非 DNF
        history_data[i]?.spanning - history_data[i]?.time_remaining ===
        history_data[i]?.spanning
      ) {
        sum += history_data[i]?.wpm;
        count++;
      }
    }
    return isNaN(sum / count) ? 0 : sum / count;
  });
  const handleSwitchStatus = useCallback(() => {
    if (status === "BEST") setStatus("AVERAGE");
    if (status === "AVERAGE") setStatus("BEST");
  });
  const handleSwitchPage = useCallback(() => {
    history.push(ROUTE.analysis);
    setTimeout(() => {
      document
        .getElementById("#analysis_history")
        .scrollIntoView({ behavior: "smooth" });
    }, 500);
  });
  return (
    <div
      className={cx(
        "h-full",
        "relative",
        "text-[16px]",
        "font-mono",
        "relative"
      )}
    >
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
          <div>
            <Link
              to="/analysis"
              onClick={handleSwitchPage}
              className="underline"
            >
              歷史紀錄
            </Link>{" "}
            (簡)
          </div>
          <div className="flex justify-around items-center gap-5 px-2">
            <div className="text-m3">w/m</div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div
        className={cx(
          "overflow-y-auto overflow-x-hidden",

          css`
            height: calc(100% - 21px - 90px);
          `
        )}
      >
        {history_data.map(({ wpm, time_remaining, spanning }, index) => (
          <HistoryStatusItem
            onClick={handleSwitchPage}
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
            {/* icon */}
            <img src={turtleIcon} className="w-20" />
            <div className="translate-y-0.5">
              {/* status */}
              <div className="text-[16px] translate-y-1.5">50000+ #</div>
              {/* best score / average score */}
              <div className="text-[32px] font-bold text-blue-300 flex gap-2 items-center">
                {status === "BEST" && (
                  <>
                    {getBestScore().toFixed(1)}
                    <span className="text-[16px] translate-y-1">w/m</span>
                  </>
                )}
                {status === "AVERAGE" && (
                  <>
                    {getAverageScore().toFixed(1)}
                    <span className="text-[16px] translate-y-1">w/m</span>
                  </>
                )}
                <Button
                  px={4}
                  py={1}
                  className="text-[16px] translate-y-1 translate-x-1"
                  onClick={handleSwitchStatus}
                >
                  {status}
                </Button>
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
