import { cx } from "@emotion/css";
import React from "react";
import StatusboxItem from "./StatusboxItem/StatusboxItem";
import {
  AiFillTrophy,
  AiFillStar,
  AiFillHeart,
  AiFillWarning,
  AiFillFire,
} from "react-icons/ai";
import { connect } from "react-redux";
import { getAverageScore } from "../../utils/getAverageScore";
import { getBestScore } from "../../utils/getBestScore";
import { getAverageExceptHeadTail } from "../../utils/getAverageExceptHeadTail";
import { getAverageAcc } from "../../utils/getAverageAcc";
import { getLatestScore } from "../../utils/getLatestScore";
import { getStandardDeviation } from "../../utils/getStandardDeviation";

function Statusbox({ history_data }) {
  return (
    <div
      className={cx(
        "w-full",
        "mt-3",
        "bg-m1",
        "flex flex-wrap",
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
            value: getAverageScore(history_data).toFixed(1),
            unit: "w/m",
          },
          {
            name: "用戶平均",
            value: "資料不足",
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
            name: "每分字數",
            value: getBestScore(history_data).toFixed(1),
            unit: "w/m",
          },
          {
            name: "平均差",
            value: (
              getBestScore(history_data) - getAverageScore(history_data)
            ).toFixed(1),
            unit: "w/m",
          },
        ]}
      >
        {getBestScore(history_data).toFixed(1)}
      </StatusboxItem>
      {/* average score */}
      <StatusboxItem
        icon={<AiFillHeart />}
        title="平均成績"
        subtitle="Average"
        unit="w/m"
        extend={[
          {
            name: "去頭尾平均",
            value: getAverageExceptHeadTail(history_data).toFixed(1),
            unit: "w/m",
          },
          {
            name: "精準度",
            value: getAverageAcc(history_data).toFixed(1),
            unit: "%",
          },
        ]}
      >
        {getAverageScore(history_data).toFixed(1)}
      </StatusboxItem>
      {/* standard deviation */}
      <StatusboxItem
        icon={<AiFillWarning />}
        title="標準差"
        subtitle="SD"
        unit="w/m"
        extend={[
          {
            name: "最近成績",
            value: getLatestScore(history_data).toFixed(1),
            unit: "w/m",
          },
          {
            name: "平均成績",
            value: getAverageScore(history_data).toFixed(1),
            unit: "w/m",
          },
        ]}
      >
        {getStandardDeviation(history_data).toFixed(1)}
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
