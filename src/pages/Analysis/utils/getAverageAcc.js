const getAverageAcc = (history_data) => {
  let acc;
  let acc_sum = 0;
  let count = 0;

  for (let i = 0; i < history_data.length; i++) {
    if (
      // 並非 DNF
      history_data[i]?.spanning - history_data[i]?.time_remaining ===
      history_data[i]?.spanning
    ) {
      acc_sum += history_data[i]?.accurarcy;
      count++;
    }
  }

  acc = isNaN(acc_sum / count) ? 0 : acc_sum / count;

  return acc;
};

export { getAverageAcc };
