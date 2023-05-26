import { cx } from "@emotion/css";
import { Chart } from "chart.js/auto";
import React, { useEffect } from "react";
import { tailwindcssConfig } from "../../../../../config/tailwind-js.config";
import { connect } from "react-redux";
import { getDnfRate } from "../../../utils/getDnfRate";

function DnfRate({ history_data }) {
  useEffect(() => {
    let chart = new Chart(document.getElementById("dnf-rate-canvas"), {
      type: "pie",
      data: {
        labels: ["通過", "DNF"],
        datasets: [
          {
            label: "占比",
            data: [
             100 - getDnfRate(history_data) * 100
            ,getDnfRate(history_data)*100],
            backgroundColor: [
              tailwindcssConfig.theme.colors.blue[400],
              tailwindcssConfig.theme.colors.red[400],
            ],
            hoverOffset: 4,
          },
        ],
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
        "p-2",
        "bg-m1",
        "flex flex-col items-center",
        "rounded-sm shadow-md"
      )}
    >
      <div className={cx("w-[95%] aspect-square")}>
        <canvas id="dnf-rate-canvas" className="mb-3"></canvas>
      </div>
      <div className="font-bold">DNF 占比率</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    history_data: state.history_data.data,
  };
};

export default connect(mapStateToProps)(DnfRate);
