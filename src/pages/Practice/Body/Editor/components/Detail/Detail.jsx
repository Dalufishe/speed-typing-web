import { cx } from "@emotion/css";
import React from "react";
import { connect } from "react-redux";

function Detail({ typing_data }) {
  const { correct_word_count, word_count, head_words_array } = typing_data;

  return (
    <div
      className={cx(
        "w-full h-full",
        "flex justify-between items-center",
        "px-2 text-b1 text-[14px]"
      )}
    >
      <div></div>
      <div>
        {correct_word_count} | {head_words_array.length} | {word_count}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    typing_data: state.typing_data.data,
    id: state.typing_data._id,
  };
};

export default connect(mapStateToProps)(Detail);
