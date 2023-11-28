let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData
    .split('\n')
    .filter(n => n != '')
    .map(n => n.repeat(108));

  const countTrees = function (right, down) {
    let move = 0;
    let count = 0;
    for (const [i, line] of dataset.entries()) {
      if (down === 2 && i % 2 !== 0) continue;
      if (line.at(move) === '#') count++;
      move += right;
    }
    return count;
  };
  // 1st result
  res1 = countTrees(3, 1);
  // 2nd result
  res2 =
    countTrees(1, 1) *
    res1 *
    countTrees(5, 1) *
    countTrees(7, 1) *
    countTrees(1, 2);
};
export { getResults, res1, res2 };
