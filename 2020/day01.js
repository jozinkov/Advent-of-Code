let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData
    .split('\n')
    .filter(n => n != '')
    .map(n => +n);
  const subtracted = dataset.map(n => 2020 - n);
  // 1st result
  let index;
  subtracted.forEach((n, i) => {
    if (dataset.includes(n)) index = i;
  });
  res1 = dataset[index] * (2020 - dataset[index]);
  // 2nd result
  let trio, num;
  dataset.forEach((n, i, arr) => {
    arr.forEach((a, ia, arrx) => {
      if (ia != i) {
        num = n + a;
        arrx.forEach((x, ix) => {
          if (ix != ia && ix != i && num + x == 2020) {
            trio = [n, a, x];
            res2 = n * a * x;
          }
        });
      }
    });
  });
};
export { getResults, res1, res2 };
