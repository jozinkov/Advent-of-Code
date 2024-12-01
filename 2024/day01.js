let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData
    .split('\n')
    .filter(d => d !== '')
    .map(d => d.split('   '));

  let leftList = [];
  let rightList = [];

  data.forEach(v => {
    leftList.push(Number(v[0]));
    rightList.push(Number(v[1]));
  });
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  res1 = leftList.reduce(
    (acc, cur, i) => (acc += Math.abs(cur - rightList[i])),
    0
  );

  res2 = leftList.reduce(
    (acc, cur, i) => (acc += cur * rightList.filter(v => v === cur).length),
    0
  );
};
export { getResults, res1, res2 };
