import React, { useEffect, useCallback, useState } from "react";
import { Chart } from "chart.js/auto";
import { cx } from "@emotion/css";
import { connect } from "react-redux";
import { tailwindcssConfig } from "../../../../config/tailwind-js.config";
import { getAverageScore } from "../../utils/getAverageScore";
import { getAverageExceptHeadTail } from "../../utils/getAverageExceptHeadTail";
import { getWorstScore } from "../../utils/getWorstScore";
import { getBestScore } from "../../utils/getBestScore";

function Trend({ history_data }) {
  // states
  const [mode, setMode] = useState("隱藏 DNF");
  // fns
  const handleChangeMode = useCallback((value) => {
    setMode(value);
  });
  // generate chart
  useEffect(() => {

    // data

    const labels = [...history_data]
      .reverse()
      .map(({ spanning, time_remaining }, index) => {
        if (
          // Not DNF
          spanning - time_remaining ===
          spanning
        ) {
          return index + 1;
        }
        return null;
      })
      .filter((item) => item != null);

    const labels_all = history_data.map((item, index) => {
      return index + 1;
    });

    const data = history_data
      .map(({ spanning, time_remaining, wpm }) => {
        if (
          // Not DNF
          spanning - time_remaining ===
          spanning
        ) {
          return wpm;
        }
        return null;
      })
      .filter((item) => item != null)
      .reverse();

    const data_all = history_data
      .map(({ spanning, time_remaining, wpm }) => {
        if (
          // Not DNF
          spanning - time_remaining ===
          spanning
        ) {
          return wpm;
        }
        return "DNF";
      })
      .reverse();

    const average_data = (function () {
      let d = [];
      let average = getAverageScore(history_data);
      for (let i = 0; i < labels_all.length; i++) {
        d.push(average);
      }
      return d;
    })();

    const average_except_head_tail_data = (function () {
      let d = [];
      let average = getAverageExceptHeadTail(history_data);
      for (let i = 0; i < labels_all.length; i++) {
        d.push(average);
      }
      return d;
    })();

    // chart

    let chart = new Chart(document.getElementById("trend-canvas"), {
      // 圖表種類
      type: "line",
      // 數據
      data: {
        // 標籤
        labels: mode === "隱藏 DNF" ? labels : labels_all,
        // 值
        datasets: [
          {
            label: "單次成績 / wpm",
            data: mode === "隱藏 DNF" ? data : data_all,
            borderColor: tailwindcssConfig.theme.colors.blue[400],
            pointBorderWidth: 4,
          },
          {
            label: "你的平均 / wpm",
            data: average_data,
            borderColor: tailwindcssConfig.theme.colors.m3,
            pointBorderWidth: 0,
            borderDash: [5],
          },
          {
            label: "去頭尾平均 / wpm",
            data: average_except_head_tail_data,
            borderColor: tailwindcssConfig.theme.colors.m2,
            pointBorderWidth: 0,
            borderDash: [5],
          },
        ],
      },
      // 配置
      options: {
        plugins: {},

        scales: {
          x: {},
          y: {
            min:
              mode === "隱藏 DNF"
                ? getWorstScore(history_data) - 5 < 0
                  ? 0
                  : getWorstScore(history_data) - 5
                : 0,
            max: getBestScore(history_data) + 5,
            // ticks: {
            //   callback: (value) => value + " w/m",
            // },
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, [history_data, mode]);


  // jsx

  return (
    <div>
      <div
        className={cx(
          "text-[24px]",
          "mb-2",
          "flex items-center justify-between"
        )}
      >
        <p>
          你的成績趨勢 <span className="text-[16px]"> / Trend</span>
        </p>
        <select
          className={cx(
            "rounded-sm",
            "bg-d2",
            "text-b1",
            "px-1",
            "text-[16px]"
          )}
          onChange={(evt) => {
            handleChangeMode(evt.target.value);
          }}
        >
          <option>隱藏 DNF</option>
          <option>顯示全部</option>
        </select>
      </div>
      {/* divider */}

      <canvas id="trend-canvas"></canvas>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    history_data: state.history_data.data,
  };
};

export default connect(mapStateToProps)(Trend);
