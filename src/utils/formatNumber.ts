export const formatNumber = (number: number) => {
  return Intl.NumberFormat().format(number);
};
