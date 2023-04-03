// D-day 계산해주는 함수
export const getDday = (savedDate: number) => {
  const today = new Date().getTime();
  const gap = savedDate - today;
  return Math.ceil(new Date(gap).getTime() / 1000 / 60 / 60 / 24);
};

export const toFullDate = (date: number) => {
  return new Intl.DateTimeFormat("ko-KR").format(date);
};

export const toYear = (date: number) => {
  return new Date(date).getFullYear();
};

export const toMonth = (date: number) => {
  const month = new Date(date).getMonth() + 1;
  if (month < 10) {
    return "0" + month.toString();
  } else {
    return month;
  }
};

export const toDay = (date: number) => {
  const day = new Date(date).getDay();
  const array = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return array[day];
};

export const toDate = (date: number) => {
  return new Date(date).getDate();
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
  const minute = new Date(date).getMinutes();
  if (minute < 10) {
    return "0" + minute.toString();
  } else {
    return minute;
  }
};
