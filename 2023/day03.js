let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  const charsArr = data.map(l => l.split(''));
  let numbers = [];

  charsArr.forEach((line, y) => {
    let numMap = new Map();
    let coords = [];
    let num = '';
    line.forEach((ch, x) => {
      if (num !== '' && !/\d/.test(ch)) numMap.set(coords, +num);
      if (/\d/.test(ch)) {
        coords.push(`${x},${y}`);
        num += ch;
        if (x === line.length - 1) numMap.set(coords, +num);
      } else {
        coords = [];
        num = '';
      }
    });
    numbers.push(numMap);
  });

  charsArr.forEach((line, y) => {
    line.forEach((char, x) => {
      if (char !== '.' && !/\d/.test(char)) {
        const above = [
          `${x - 1},${y - 1}`,
          `${x},${y - 1}`,
          `${x + 1},${y - 1}`,
        ];
        const inline = [`${x - 1},${y}`, `${x + 1},${y}`];
        const below = [
          `${x - 1},${y + 1}`,
          `${x},${y + 1}`,
          `${x + 1},${y + 1}`,
        ];
        let used = [];
        let gear = [];
        const findNums = function (arr, y) {
          if (numbers[y]) {
            numbers[y].forEach((v, k) => {
              arr.forEach(c => {
                if (!used.includes(k) && k.indexOf(c) !== -1) {
                  res1 += v;
                  used.push(k);
                  gear.push(v);
                }
              });
            });
          }
        };
        findNums(inline, y);
        findNums(above, y - 1);
        findNums(below, y + 1);
        if (char === '*' && gear.length === 2) res2 += gear[0] * gear[1];
      }
    });
  });
};
export { getResults, res1, res2 };
