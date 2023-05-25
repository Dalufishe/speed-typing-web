const getLatestScore = (history_data) => {
  let latest_score = 0;
  for (let i = 0; i < history_data.length; i++) {
    if (
      // 並非 DNF
      history_data[i]?.spanning - history_data[i]?.time_remaining ===
      history_data[i]?.spanning
    ) {
      latest_score = history_data[i].wpm;
      break;
    }
  }
  return latest_score;
};

export { getLatestScore };
