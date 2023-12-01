let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData.split('\n').filter(n => n != '');
  let seatIDs = [];

  const find = function (arr, hi, lo, min, max) {
    arr.forEach(char => {
      if (char === hi) max -= Math.round((max - min) / 2);
      if (char === lo) min += Math.round((max - min) / 2);
    });
    return min;
  };

  dataset.forEach(p => {
    const row = p.slice(0, 7).split('');
    const column = p.slice(-3).split('');

    seatIDs.push(
      find(row, 'F', 'B', 0, 127) * 8 + find(column, 'L', 'R', 0, 7)
    );
  });
  seatIDs.sort((a, b) => a - b);

  res1 = seatIDs.slice(-1);
  res2 = seatIDs.find((e, i) => seatIDs[i + 1] == e + 2) + 1;
};
export { getResults, res1, res2 };
