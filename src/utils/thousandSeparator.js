// add spaces as thousand separators
export const thousandSeparator = (num, separator = ' ') => {
  const numArr = num.toString().split('');
  const formatedNum = numArr.reduceRight((acc, el, idx) => {
    const positionFromEnd = numArr.length - idx;
    const isDivider = positionFromEnd % 3 === 0 && idx !== 0;
    return (isDivider ? separator : '') + el + acc;
  }, '');

  return formatedNum;
};
