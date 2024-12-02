let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData
    .split('\n')
    .filter(d => d !== '')
    .map(v => v.split(' ').map(s => Number(s)));

  let dampener = 0;

  const findSafeReports = function (
    cur,
    problemDampener = false,
    recursive = false
  ) {
    let isSafe = false;
    let negative = undefined;
    let positive = undefined;

    let abort = false;
    for (let i = 0; i < cur.length - 1; i++) {
      const diff = cur[i] - cur[i + 1];

      if (
        Math.abs(diff) < 1 ||
        Math.abs(diff) > 3 ||
        (negative && diff > 0) ||
        (positive && diff < 0)
      ) {
        if (problemDampener && dampener === 0 && !recursive) {
          dampener++;
          if (i === 0) {
            if (
              findSafeReports(cur.toSpliced(i, 1), true, true) ||
              findSafeReports(cur.toSpliced(i + 1, 1), true, true)
            ) {
              isSafe = true;
              abort = true;
            }
          } else if (i === cur.length - 1) {
            if (
              findSafeReports(cur.toSpliced(i, 1), true, true) ||
              findSafeReports(cur.toSpliced(i - 1, 1), true, true)
            ) {
              isSafe = true;
              abort = true;
            }
          } else {
            if (
              findSafeReports(cur.toSpliced(i + 1, 1), true, true) ||
              findSafeReports(cur.toSpliced(i, 1), true, true) ||
              findSafeReports(cur.toSpliced(i - 1, 1), true, true)
            ) {
              isSafe = true;
              abort = true;
            }
          }
        } else abort = true;
      }
      if (abort || (dampener > 0 && !recursive)) break;
      diff < 0 ? (negative = true) : (positive = true);

      if (i === cur.length - 2) isSafe = true;
    }
    return isSafe;
  };

  res1 = data.reduce((acc, cur) => (findSafeReports(cur) ? acc + 1 : acc), 0);

  res2 = data.reduce((acc, cur) => {
    dampener = 0;
    return findSafeReports(cur, true) ? acc + 1 : acc;
  }, 0);
};
export { getResults, res1, res2 };
