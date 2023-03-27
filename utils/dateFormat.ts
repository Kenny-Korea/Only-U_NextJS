export const toDate = (date: number) => {
  return new Intl.DateTimeFormat("ko-KR").format(date);
};

export const toHour = (date: number) => {
  const hour = new Date(date).getHours();
  if (hour < 10) {
    return "0" + hour.toString();
  } else {
    return hour;
  }
};

export const toMinute = (date: number) => {
  return new Date(date).getMinutes();
};
