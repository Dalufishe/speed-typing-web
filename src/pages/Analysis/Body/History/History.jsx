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

const HistoryItem = ({ index, time, wpm, acc, extend }) => {
  return (
    <tr className={cx("w-full h-[32px]", "border-b border-m1")}>
      <td className={cx("px-1 border-r border-m1 text-m3")}>{index}</td>
      <td className={cx("px-2 border-r border-m1 text-m3")}>{time}</td>
      <td className={cx("px-2 border-r border-m1 text-m3")}>{wpm}</td>
      <td className={cx("px-2 border-r border-m1 text-m3")}>{acc}</td>
      <td className={cx("px-2 border-r border-m1 text-m3")}>{extend}</td>
    </tr>
  );
};

function History({ history_data }) {
  const handleIndex = useCallback((index) => {
    return index + 1 < 10 ? "0" + (index + 1) : index + 1;
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

  const handleAcc = useCallback((item) => {
    if (item.spanning - item.time_remaining === item.spanning) {
      return item.accurarcy + "  %";
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
          wpm={"每分字數"}
          acc={"精準度"}
          extend={<div className="flex justify-end">其他</div>}
        />
        {history_data.map((item, index) => (
          <HistoryItem
            key={item.start_time}
            index={handleIndex(index)}
            time={handleTime(item)}
            wpm={handleWpm(item)}
            acc={handleAcc(item)}
            extend={
              <div className={cx("flex justify-end gap-2")}>
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
