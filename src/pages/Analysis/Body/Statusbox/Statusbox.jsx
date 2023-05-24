import { cx } from "@emotion/css";
import React, { useCallback } from "react";
import StatusboxItem from "./StatusboxItem/StatusboxItem";
import {
  AiFillTrophy,
  AiFillStar,
  AiFillHeart,
  AiFillWarning,
  AiFillFire,
} from "react-icons/ai";
import { connect } from "react-redux";

function Statusbox({ history_data }) {
  const getBestScore = useCallback(() => {
    let highest = 0;
    let acc = 0;

    for (let i = 0; i < history_data.length; i++) {
      if (history_data[i]?.wpm > highest) {
        // not DNF
        if (
          history_data[i].spanning - history_data[i].time_remaining ===
          history_data[i].spanning
        ) {
          highest = history_data[i]?.wpm;
          acc = history_data[i]?.accurarcy;
        }
      }
    }

    return [highest, acc];
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
  const getStandardDeviation = useCallback(() => {
    let average = getAverageScore();
    let sum = 0;
    let count = 0;
    for (let i = 0; i < history_data.length; i++) {
      if (
        // 並非 DNF
        history_data[i]?.spanning - history_data[i]?.time_remaining ===
        history_data[i]?.spanning
      ) {
        sum += (history_data[i]?.wpm - average) ** 2;
        count++;
      }

      return isNaN(Math.sqrt(sum / count)) ? 0 : Math.sqrt(sum / count);
    }
  });
  return (
    <div className={cx("w-full h-[250px] ", "mt-3", "bg-m1", "flex", "p-3")}>
      {/* rank */}
      <StatusboxItem
        icon={<AiFillTrophy />}
        title="你的排名"
        subtitle="Rank"
        unit="#"
        extend={[
          {
            name: "你贏過了 90% 的用戶",
            value: <AiFillFire />,
          },
        ]}
      >
        5000+
      </StatusboxItem>
      {/* best score */}
      <StatusboxItem
        icon={<AiFillStar />}
        title="最佳成績"
        subtitle="Best"
        unit="w/m"
        extend={[
          { name: "每秒字數", value: getBestScore()[0] + ".0", unit: "w/m" },
          {
            name: "精準度",
            value: getBestScore()[1].toFixed(1),
            unit: "%",
          },
        ]}
      >
        {getBestScore()[0]}.0
      </StatusboxItem>
      {/* average score */}
      <StatusboxItem
        icon={<AiFillHeart />}
        title="平均成績"
        subtitle="Average"
        unit="w/m"
      >
        {getAverageScore().toFixed(1)}
      </StatusboxItem>
      {/* standard deviation */}
      <StatusboxItem
        icon={<AiFillWarning />}
        title="標準差"
        subtitle="SD"
        unit="w/m"
      >
        {getStandardDeviation().toFixed(1)}
      </StatusboxItem>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    history_data: state.history_data.data,
  };
};

export default connect(mapStateToProps)(Statusbox);
