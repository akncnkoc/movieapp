const timeConversion = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? h : h;
  m = m < 10 ? m : m;
  return `${h}s ${m}d`;
};
export { timeConversion };
