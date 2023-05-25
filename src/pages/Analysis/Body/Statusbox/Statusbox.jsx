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
    let score = 0;
    let acc = 0;

    for (let i = 0; i < history_data.length; i++) {
      if (history_data[i]?.wpm > score) {
        // not DNF
        if (
          history_data[i].spanning - history_data[i].time_remaining ===
          history_data[i].spanning
        ) {
          score = history_data[i]?.wpm;
          acc = history_data[i]?.accurarcy;
        }
      }
    }

    return [score, acc];
  });
  const getAverageScore = useCallback(() => {
    let score;
    let acc;
    let score_sum = 0;
    let acc_sum = 0;
    let count = 0;

    for (let i = 0; i < history_data.length; i++) {
      if (
        // 並非 DNF
        history_data[i]?.spanning - history_data[i]?.time_remaining ===
        history_data[i]?.spanning
      ) {
        score_sum += history_data[i]?.wpm;
        acc_sum += history_data[i]?.accurarcy;
        count++;
      }
    }
    score = isNaN(score_sum / count) ? 0 : score_sum / count;
    acc = isNaN(acc_sum / count) ? 0 : acc_sum / count;
    return [score, acc];
  });
  const getStandardDeviation = useCallback(() => {
    let average = getAverageScore()[0];
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
    }

    return isNaN(Math.sqrt(sum / count)) ? 0 : Math.sqrt(sum / count);
  });

  const getLatestData = useCallback(() => {
    let latest_score = 0;
    for (let i = 0; i < history_data.length; i++) {
      if (
        // 並非 DNF
        history_data[i]?.spanning - history_data[i]?.time_remaining ===
        history_data[i]?.spanning
      ) {
        latest_score = history_data[i].wpm;
        break;
      }
    }
    return latest_score;
  });

  return (
    <div
      className={cx(
        "w-full",
        "mt-3",
        "bg-m1",
        "flex",
        "p-3 pb-4",
        "rounded-sm"
      )}
    >
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
          {
            name: "你的平均",
            value: getAverageScore()[0].toFixed(1),
            unit: "w/m",
          },
          {
            name: "用戶平均",
            value: "No enough data",
          },
        ]}
      >
        50K+
      </StatusboxItem>
      {/* best score */}
      <StatusboxItem
        icon={<AiFillStar />}
        title="最佳成績"
        subtitle="Best"
        unit="w/m"
        extend={[
          {
            name: "每秒字數",
            value: getBestScore()[0].toFixed(1),
            unit: "w/m",
          },
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
        extend={[
          {
            name: "每秒字數",
            value: getAverageScore()[0].toFixed(1),
            unit: "w/m",
          },
          {
            name: "精準度",
            value: getAverageScore()[1].toFixed(1),
            unit: "%",
          },
        ]}
      >
        {getAverageScore()[0].toFixed(1)}
      </StatusboxItem>
      {/* standard deviation */}
      <StatusboxItem
        icon={<AiFillWarning />}
        title="標準差"
        subtitle="SD"
        unit="w/m"
        extend={[
          {
            name: "最近成績 (!DNF)",
            value: getLatestData().toFixed(1),
            unit: "w/m",
          },
          {
            name: "平均成績",
            value: getAverageScore()[0].toFixed(1),
            unit: "w/m",
          },
        ]}
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
