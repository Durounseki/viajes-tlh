function formatTripDate(startDateStr, endDateStr) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const startDay = startDate.getUTCDate();
  const endDay = endDate.getUTCDate();
  const startMonth = new Intl.DateTimeFormat("es-MX", {
    month: "long",
    timeZone: "UTC",
  }).format(startDate);
  const endMonth = new Intl.DateTimeFormat("es-MX", {
    month: "long",
    timeZone: "UTC",
  }).format(endDate);
  const year = new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    timeZone: "UTC",
  }).format(startDate);

  if (startDay === endDay && startMonth === endMonth) {
    return `${startDay} de ${startMonth}, ${year}`;
  }
  if (startMonth === endMonth) {
    return `${startDay} al ${endDay} de ${startMonth}, ${year}`;
  }
  return `${startDay} de ${startMonth} al ${endDay} de ${endMonth}, ${year}`;
}

export { formatTripDate };
