import React, { useCallback } from "react";
import { connect } from "react-redux";
import ResultItem from "./ResultItem/ResultItem";

function ResultModalCenter({ typing_data }) {
  // get data
  const { wpm, accuracy } = typing_data;

  // fns
  const handleWpm = useCallback(function ({ spanning, wpm, time_remaining }) {
    return spanning - time_remaining === spanning ? wpm?.toFixed(1) : "DNF";
  });

  const handleAcc = useCallback(({ spanning, accuracy, time_remaining }) => {
    return spanning - time_remaining === spanning
      ? accuracy?.toFixed(1)
      : "DNF";
  });

  return (
    <div className="flex p-2 gap-6">
      <ResultItem
        title={"每分字數"}
        subtitle={"wpm"}
        value={handleWpm(typing_data)}
        unit={"w/m"}
      />
      <ResultItem
        title={"精準度"}
        subtitle={"accuracy"}
        value={handleAcc(typing_data)}
        unit={"%"}
      />
      <ResultItem
        title={"階段排名"}
        subtitle={"accuracy"}
        value={"50K+"}
        unit={"#"}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    typing_data: state.typing_data.data,
  };
};

export default connect(mapStateToProps)(ResultModalCenter);
