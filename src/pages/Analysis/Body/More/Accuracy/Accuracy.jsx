import { cx } from "@emotion/css";
import { Chart } from "chart.js/auto";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAverageAcc } from "../../../utils/getAverageAcc";
import { tailwindcssConfig } from "../../../../../config/tailwind-js.config";

function Accuracy({ history_data }) {
  useEffect(() => {
    let chart = new Chart(document.getElementById("accuracy-canvas"), {
      type: "doughnut",
      data: {
        labels: ["正確", "錯誤"],
        datasets: [
          {
            label: "占比",
            data: [
              getAverageAcc(history_data),
              100 - getAverageAcc(history_data),
            ],
            backgroundColor: [
              tailwindcssConfig.theme.colors.blue[400],
              tailwindcssConfig.theme.colors.red[400],
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "",
          },
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, [history_data]);

  return (
    <div
      className={cx(
        "w-full h-full",
        "p-4",
        "bg-m1",
        "border-t-2 border-m3",
        "flex flex-col items-center",
        "rounded-sm shadow-md"
      )}
    >
      <div className={cx("w-[95%] aspect-square")}>
        <canvas id="accuracy-canvas" className="mb-4"></canvas>
      </div>
      <div className="font-bold">精準度</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    history_data: state.history_data.data,
  };
};

export default connect(mapStateToProps)(Accuracy);
