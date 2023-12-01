let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData
    .split('\n')
    .filter(n => n != '')
    .map(n => +n);

  const findWeakness = function (i) {
    const preamble = dataset.slice(i - 25, i); // previous 25 numbers
    const num = dataset[i];
    if (!preamble.some(n => preamble.includes(num - n))) {
      res1 = num;
      return true;
    } else return false;
  };
  for (let i = 25; i < dataset.length; i++) {
    const check = findWeakness(i);
    if (check) break;
  }

  dataset.forEach((d, index) => {
    let sum = d;
    for (let i = index + 1; i < dataset.length; i++) {
      sum += dataset[i];
      if (sum < res1) continue;
      else if (sum === res1) {
        const arr = dataset.slice(index, i + 1).sort((a, b) => a - b);
        res2 = arr.at(0) + arr.at(-1);
      } else break;
    }
  });
};
export { getResults, res1, res2 };
