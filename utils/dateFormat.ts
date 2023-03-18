export const dateFormat = (date: number) => {
  return new Intl.DateTimeFormat("ko-KR").format(date * 1000);
};
