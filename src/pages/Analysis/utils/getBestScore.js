const getBestScore = (history_data) => {
  let score = 0;

  for (let i = 0; i < history_data?.length; i++) {
    if (history_data[i]?.wpm > score) {
      // not DNF
      if (
        history_data[i].spanning - history_data[i].time_remaining ===
        history_data[i].spanning
      ) {
        score = history_data[i]?.wpm;
      }
    }
  }
  return score;
};

export {getBestScore}