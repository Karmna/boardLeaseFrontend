export const calculateNumberOfDays = (startDate, endDate) => {
  if (!startDate || !endDate) return;
  const DAY_IN_MS = 1000 * 60 * 60 * 24;

  return Math.ceil(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / DAY_IN_MS
  );
};
