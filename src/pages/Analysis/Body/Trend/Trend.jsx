import React, { useEffect, useLayoutEffect } from "react";
import { Chart } from "chart.js/auto";
import { cx } from "@emotion/css";
import { connect } from "react-redux";
import { tailwindcssConfig } from "../../../../config/tailwind-js.config";

function Trend({ history_data }) {
  useLayoutEffect(() => {
    const labels = history_data
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
    new Chart(document.getElementById("trend-canvas"), {
      type: "line",
      options: {
        borderColor: tailwindcssConfig.theme.colors["blue-400"],
        plugins: {},
      },
      data: {
        labels: labels,
        datasets: [
          {
            label: "words per minute",
            data: data,
            fill: false,
          },
        ],
      },
    });
  }, [history_data]);

  return (
    <div className={cx("w-[900px]", "mt-3")}>
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
