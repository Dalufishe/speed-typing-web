const getAverageScore = (history_data) => {
  let score;
  let score_sum = 0;
  let count = 0;

  for (let i = 0; i < history_data?.length; i++) {
    if (
      // 並非 DNF
      history_data[i]?.spanning - history_data[i]?.time_remaining ===
      history_data[i]?.spanning
    ) {
      score_sum += history_data[i]?.wpm;
      count++;
    }
  }

  score = isNaN(score_sum / count) ? 0 : score_sum / count;

  return score;
};

export {getAverageScore}