import React, { useCallback } from "react";
import { cx } from "@emotion/css";
import Heading2 from "../../components/Heading2";
import { connect } from "react-redux";
import {
  AiOutlineVideoCamera,
  AiOutlineMore,
  AiOutlineStar,
} from "react-icons/ai";
import Button from "../../../../components/Button/Button";

const HistoryItem = ({ index, time, wpm, wpm_subtraction, acc, extend }) => {
  return (
    <tr className={cx("w-full h-[32px]", "border-b border-m1")}>
      <td className={cx("px-1 border-r border-m1 text-m3")}>{index}</td>
      <td className={cx("px-2 border-r border-m1 text-m3")}>{time}</td>
      <td className={cx("px-2 border-r border-m1 text-b1")}>{wpm}</td>
      <td className={cx("px-2 border-r border-m1 text-m3")}>
        {(() => {
          const result = wpm_subtraction;
          return result >= 0 ? (
            <span className="text-blue-400">{result}</span>
          ) : (
            <span className="text-red-400">{result}</span>
          );
        })()}
      </td>
      <td className={cx("px-2 border-r border-m1 text-m3")}>{acc}</td>
      <td className={cx("px-2 border-r border-m1 text-m3")}>{extend}</td>
    </tr>
  );
};

function History({ history_data }) {
  const handleIndex = useCallback((index) => {
    return history_data.length - index;
  });

  const handleTime = useCallback((item) => {
    return new Date(item.start_time).toLocaleString();
  });

  const handleWpm = useCallback((item) => {
    if (item.spanning - item.time_remaining === item.spanning) {
      return item.wpm + " w/m";
    } else {
      return "DNF";
    }
  });

  const handleWpmSubtraction = useCallback(function (
    { spanning, wpm, time_remaining },
    index
  ) {
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
    if (index === history_data.length - 1) {
      subtract = "";
    }
    return subtract;
  });

  const handleAcc = useCallback((item) => {
    if (item.spanning - item.time_remaining === item.spanning) {
      return item.accuracy + "  %";
    } else {
      return "DNF";
    }
  });

  return (
    <div id="#analysis_history" className={cx("w-full")}>
      <Heading2 title={"歷史紀錄"} subtitle={"History"} />
      <table className={cx("w-full", "border border-m1 border-b-0")}>
        <HistoryItem
          index={"次"}
          time={"日期 / 時間"}
          wpm={<div className="text-m3">每分字數</div>}
          wpm_subtraction={<div className="text-m3">差 (+-)</div>}
          acc={"精準度"}
          extend={"其他"}
        />
        {history_data.map((item, index) => (
          <HistoryItem
            key={item.start_time}
            index={handleIndex(index)}
            time={handleTime(item)}
            wpm={handleWpm(item)}
            wpm_subtraction={handleWpmSubtraction(item, index)}
            acc={handleAcc(item)}
            extend={
              <div className={cx("flex gap-2")}>
                <Button px={4} py={4} bg="m1">
                  <AiOutlineStar />
                </Button>
                <Button px={4} py={4} bg="m1">
                  <AiOutlineVideoCamera />
                </Button>
                <Button px={4} py={4} bg="m1">
                  <AiOutlineMore />
                </Button>
              </div>
            }
          />
        ))}
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    history_data: state.history_data.data,
  };
};

export default connect(mapStateToProps)(History);
