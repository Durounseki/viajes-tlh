function formatTripDate(startDateStr, endDateStr) {
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

function formatDateForInput(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
}

export { formatTripDate, formatDateForInput };
