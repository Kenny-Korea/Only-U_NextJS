export const dateFormat = (date: number) => {
  console.log(date);
  return new Intl.DateTimeFormat("ko-KR").format(date * 1000);
};
