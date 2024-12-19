let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  const maxY = data.length;
  const maxX = data[0].length;

  let xmasMap = new Map();
  let arrX = [];
  let arrA = [];
  data.forEach((line, y) => {
    line.split('').forEach((ch, x) => {
      xmasMap.set(`${x},${y}`, ch);
      if (ch === 'X') arrX.push(`${x},${y}`);
      if (ch === 'A') arrA.push(`${x},${y}`);
    });
  });

  const findXMAS = function (x, y) {
    const chars = ['M', 'A', 'S'];

    if (
      x - 3 >= 0 &&
      chars.every((ch, i) => ch === xmasMap.get(`${x - (i + 1)},${y}`))
    )
      res1++;
    if (
      x + 3 < maxX &&
      chars.every((ch, i) => ch === xmasMap.get(`${x + (i + 1)},${y}`))
    )
      res1++;
    if (
      y + 3 < maxY &&
      chars.every((ch, i) => ch === xmasMap.get(`${x},${y + (i + 1)}`))
    )
      res1++;
    if (
      y - 3 >= 0 &&
      chars.every((ch, i) => ch === xmasMap.get(`${x},${y - (i + 1)}`))
    )
      res1++;
    if (
      y - 3 >= 0 &&
      x + 3 < maxX &&
      chars.every(
        (ch, i) => ch === xmasMap.get(`${x + (i + 1)},${y - (i + 1)}`)
      )
    )
      res1++;
    if (
      y - 3 >= 0 &&
      x - 3 >= 0 &&
      chars.every(
        (ch, i) => ch === xmasMap.get(`${x - (i + 1)},${y - (i + 1)}`)
      )
    )
      res1++;
    if (
      y + 3 < maxY &&
      x + 3 < maxX &&
      chars.every(
        (ch, i) => ch === xmasMap.get(`${x + (i + 1)},${y + (i + 1)}`)
      )
    )
      res1++;
    if (
      y + 3 < maxY &&
      x - 3 >= 0 &&
      chars.every(
        (ch, i) => ch === xmasMap.get(`${x - (i + 1)},${y + (i + 1)}`)
      )
    )
      res1++;
  };

  const findMASX = function (x, y) {
    if (
      x - 1 >= 0 &&
      y - 1 >= 0 &&
      y + 1 < maxY &&
      x + 1 < maxX &&
      ((xmasMap.get(`${x - 1},${y - 1}`) === 'M' &&
        xmasMap.get(`${x + 1},${y + 1}`) === 'S') ||
        (xmasMap.get(`${x - 1},${y - 1}`) === 'S' &&
          xmasMap.get(`${x + 1},${y + 1}`) === 'M')) &&
      ((xmasMap.get(`${x + 1},${y - 1}`) === 'M' &&
        xmasMap.get(`${x - 1},${y + 1}`) === 'S') ||
        (xmasMap.get(`${x + 1},${y - 1}`) === 'S' &&
          xmasMap.get(`${x - 1},${y + 1}`) === 'M'))
    )
      res2++;
  };

  arrX.forEach(coords => {
    const [x, y] = coords.split(',');
    findXMAS(Number(x), Number(y));
  });

  arrA.forEach(coords => {
    const [x, y] = coords.split(',');
    findMASX(Number(x), Number(y));
  });
};
export { getResults, res1, res2 };
