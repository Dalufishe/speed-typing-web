const getDnfRate = (history_data) => {
  const totalCount = history_data.length;
  let dnfCount = 0;
  for (let i = 0; i < totalCount; i++) {
    if (
      history_data[i].spanning - history_data[i].time_remaining !=
      history_data[i].spanning
    ) {
      dnfCount++;
    }
  }

  return isNaN(dnfCount / totalCount) ? 0 : dnfCount / totalCount;
};

export {getDnfRate}