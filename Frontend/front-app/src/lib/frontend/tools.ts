export const formatWon = (n: number) =>
  new Intl.NumberFormat("ko-KR").format(n);
