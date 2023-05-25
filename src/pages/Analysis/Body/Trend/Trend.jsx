import React, { useEffect, useCallback, useState } from "react";
import { Chart } from "chart.js/auto";
import { cx } from "@emotion/css";
import { connect } from "react-redux";
import { tailwindcssConfig } from "../../../../config/tailwind-js.config";

function Trend({ history_data }) {
  // states
  const [mode, setMode] = useState("隱藏 DNF");
  // fns
  const handleChangeMode = useCallback((value) => {
    setMode(value);
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
  const getWorstScore = useCallback(() => {
    let lowest = getBestScore();
    for (let i = 0; i < history_data.length; i++) {
      if (history_data[i]?.wpm < lowest) {
        // not DNF
        if (
          history_data[i].spanning - history_data[i].time_remaining ===
          history_data[i].spanning
        ) {
          lowest = history_data[i]?.wpm;
        }
      }
    }

    return lowest;
  });
  // generate chart
  useEffect(() => {
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
      let average = getAverageScore();
      for (let i = 0; i < labels_all.length; i++) {
        d.push(average);
      }
      return d;
    })();

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
                ? getWorstScore() - 5 < 0
                  ? 0
                  : getWorstScore() - 5
                : 0,
            max: getBestScore() + 5,
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
