let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData
    .split('\n')
    .filter(n => n != '')
    .map(d => +d)
    .sort((a, b) => a - b);
  dataset.unshift(0); // add charging outlet
  dataset.push(dataset.at(-1) + 3); // add built-in adapter

  const differences = dataset.map((n, i, arr) => arr[i + 1] - n).slice(0, -1);
  const counts = differences.reduce(
    (acc, d) => acc.set(d, (acc.get(d) || 0) + 1),
    new Map()
  );
  res1 = counts.get(1) * counts.get(3);

  let count = 0;
  let ones = [];
  differences.forEach(n => {
    if (n === 1) count++;
    if (n === 3) {
      ones.push(count);
      count = 0;
    }
  });
  ones.forEach((c, i) => {
    if (res2 !== 0) {
      if (c === 2) res2 *= 2;
      if (c === 3) res2 *= 4;
      if (c === 4) res2 *= 7;
    } else {
      if (c === 2) res2 = 2;
      if (c === 3) res2 = 4;
      if (c === 4) res2 = 7;
    }
  });
};
export { getResults, res1, res2 };
