export const calculateNumberOfDays = (startDate, endDate) => {
  if (!startDate || !endDate) return;
  const DAY_IN_MS = 1000 * 60 * 60 * 24;

  return Math.ceil(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / DAY_IN_MS
  );
};

export const dateRangeOverlaps = (dateRange1, dateRange2) => {
  dateRange1.startDate = new Date(dateRange1.startDate).getTime();
  dateRange1.endDate = new Date(dateRange1.endDate).getTime();

  dateRange2.startDate = new Date(dateRange2.startDate).getTime();
  dateRange2.endDate = new Date(dateRange2.endDate).getTime();

  if (
    dateRange1.startDate <= dateRange2.startDate &&
    dateRange2.startDate <= dateRange1.endDate
  )
    return true; // dateRange2 starts in dateRange1
  if (
    dateRange1.startDate <= dateRange2.endDate &&
    dateRange2.endDate <= dateRange1.endDate
  )
    return true; // dateRange2 ends in dateRange1
  if (
    dateRange2.startDate < dateRange1.startDate &&
    dateRange1.endDate < dateRange2.endDate
  )
    return true; // dateRange2 includes dateRange1
  return false;
};

export const checkAvailabibility = (dateRangeArray, dateRange) => {
  for (let dr of dateRangeArray) {
    if (dateRangeOverlaps(dr, dateRange)) {
      return false;
    }
  }
  return true;
};