import { cx } from "@emotion/css";
import React from "react";
import { connect } from "react-redux";
import { FaLaptop } from "react-icons/fa";

function ResultModalTop({ typing_data }) {
  const { start_time } = typing_data;

  return (
    <>
      {/* Top */}
      <div className="flex justify-between items-center">
        <div>
          <div>
            {/* title */}
            <span className={cx("text-[32px]")}>單次成績 </span>
            {/* subtitle */}
            <span className={cx("text-[20px]")}>/ Single</span>
          </div>
          {/* time */}
          <div>{new Date(start_time).toLocaleString()}</div>
        </div>
        <div className={cx("flex items-center gap-3")}>
          <div className={cx("flex flex-col items-end")}>
            {/* user */}
            <p className={cx("text-m3 font-bold text-[32px]")}>本機用戶</p>
            {/* rank */}
            <p className={cx("text-m3 font-bold text-[20px]")}>50000+ #</p>
          </div>
          {/* user icon */}
          <div
            className={cx(
              "text-m3 text-[48px]",
              "border border-m3",
              "bg-d2",
              "p-3",
              "rounded-md shadow-md"
            )}
          >
            <FaLaptop />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    typing_data: state.typing_data.data,
  };
};

export default connect(mapStateToProps)(ResultModalTop);
