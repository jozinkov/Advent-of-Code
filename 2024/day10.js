let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  const maxY = data.length;
  const maxX = data[0].length;
  let trailMap = new Map();
  let heads = [];
  data.forEach((line, y) => {
    line.split('').forEach((num, x) => {
      const n = Number(num);
      trailMap.set(`${x},${y}`, n);
      if (n === 0) heads.push(`${x},${y}`);
    });
  });

  let scores1 = [];
  const findScore = function (x, y, num) {
    if (num === 9) {
      res2++;
      if (!scores1.includes(`${x},${y}`)) scores1.push(`${x},${y}`);
      return;
    }

    if (x < maxX && trailMap.get(`${x + 1},${y}`) === num + 1)
      findScore(x + 1, y, num + 1);
    if (x > 0 && trailMap.get(`${x - 1},${y}`) === num + 1)
      findScore(x - 1, y, num + 1);
    if (y < maxY && trailMap.get(`${x},${y + 1}`) === num + 1)
      findScore(x, y + 1, num + 1);
    if (y > 0 && trailMap.get(`${x},${y - 1}`) === num + 1)
      findScore(x, y - 1, num + 1);
  };

  heads.forEach(h => {
    scores1 = [];
    const [x, y] = h.split(',');
    findScore(Number(x), Number(y), 0);
    res1 += scores1.length;
  });
};
export { getResults, res1, res2 };
