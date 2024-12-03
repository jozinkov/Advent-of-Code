let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data1 = fileData.match(/mul\(\d+\,\d+\)/g);
  const data2 = fileData
    .split("don't()")
    .map((s, i) => (i === 0 ? s : s.split('do()').slice(1).join()))
    .join()
    .match(/mul\(\d+\,\d+\)/g);

  const calculate = data =>
    data.reduce((acc, cur) => {
      const [n1, n2] = cur.replace('mul(', '').replace(')', '').split(',');
      return acc + Number(n1) * Number(n2);
    }, 0);

  res1 = calculate(data1);
  res2 = calculate(data2);
};
export { getResults, res1, res2 };
