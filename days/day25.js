let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  let [key1, key2] = fileData
    .split('\n')
    .filter(d => d !== '')
    .map(d => +d);

  let stop = 0;
  let num = 1;
  let subject = 7;
  const divide = 20201227;
  let loop1, loop2;

  for (let i = 1; i > 0; i++) {
    num = (num * subject) % divide;
    if (num === key1) {
      loop1 = i;
      stop++;
    }
    if (num === key2) {
      loop2 = i;
      stop++;
    }
    if (stop === 2) break;
  }

  num = 1;
  subject = key1;
  for (let i = 0; i < loop2; i++) {
    num = (num * subject) % divide;
  }
  res1 = num;
};
export { getResults, res1, res2 };
