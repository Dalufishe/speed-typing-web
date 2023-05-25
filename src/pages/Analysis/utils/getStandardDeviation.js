import { getAverageScore } from "./getAverageScore";

const getStandardDeviation = (history_data) => {
  let average = getAverageScore(history_data);
  let sum = 0;
  let count = 0;
  for (let i = 0; i < history_data.length; i++) {
    if (
      // 並非 DNF
      history_data[i]?.spanning - history_data[i]?.time_remaining ===
      history_data[i]?.spanning
    ) {
      sum += (history_data[i]?.wpm - average) ** 2;
      count++;
    }
  }

  return isNaN(Math.sqrt(sum / count)) ? 0 : Math.sqrt(sum / count);
};

export { getStandardDeviation };
