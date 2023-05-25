import { getBestScore } from "./getBestScore";
import { getWorstScore } from "./getWorstScore";

const getAverageExceptHeadTail = (history_data) => {
  let score;
  let score_sum = 0;
  let count = 0;

  for (let i = 0; i < history_data.length; i++) {
    if (
      // 並非 DNF
      history_data[i]?.spanning - history_data[i]?.time_remaining ===
      history_data[i]?.spanning
    ) {
      score_sum += history_data[i]?.wpm;
      count++;
    }
  }

  //   console.log(score_sum, count);

  if (count > 2) {
    count -= 2;
    score_sum =
      score_sum - getBestScore(history_data) - getWorstScore(history_data);
  }

  score = isNaN(score_sum / count) ? 0 : score_sum / count;

  return score;
};

export { getAverageExceptHeadTail };
