let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  const [times, dists] = data.map(d =>
    d
      .split(':')[1]
      .split(' ')
      .filter(d => d !== '')
      .map(n => +n)
  );
  let ways = new Array(times.length).fill(0);
  times.forEach((t, i) => {
    for (let x = 1; x < t; x++) x * (t - x) > dists[i] && ways[i]++;
    res1 === 0 ? (res1 = ways[i]) : (res1 *= ways[i]);
  });

  const [time, dist] = data.map(d => +d.split(':')[1].replaceAll(' ', ''));
  let first, last;
  for (let x = 1; x < time; x++) {
    if (x * (time - x) > dist) {
      first = x;
      break;
    }
  }
  for (let x = time - 1; x > first; x--) {
    if (x * (time - x) > dist) {
      last = x;
      break;
    }
  }
  res2 = last - first + 1;
};
export { getResults, res1, res2 };
