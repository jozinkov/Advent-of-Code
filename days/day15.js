let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData.split(',').map(n => +n);

  //   let memory = new Array(...dataset);
  //   let turn = dataset.length - 1;
  //   let arr;

  //   do {
  //     if (memory.filter(n => n === memory[turn]).length > 1) {
  //       arr = memory.slice(0, -1);
  //       memory.push(turn - arr.lastIndexOf(memory[turn]));
  //     } else {
  //       memory.push(0);
  //     }
  //     turn++;
  //   } while (turn < 2019); // 2020th number
  //   res1 = memory[turn];

  const findNum = function (limit) {
    let memory = new Map(dataset.map((num, i) => [num, i + 1]));
    let max = dataset.length;
    let lastTurn = dataset[max - 1];
    let curr = lastTurn;

    for (let i = max; i < limit; i++) {
      lastTurn = memory.has(lastTurn) ? i - memory.get(lastTurn) : 0;
      memory.set(curr, i);
      curr = lastTurn;
    }
    return lastTurn;
  };

  res1 = findNum(2020);
  res2 = findNum(30000000);
};
export { getResults, res1, res2 };
