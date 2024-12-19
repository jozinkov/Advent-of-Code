let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  const maxY = data.length;
  const maxX = data[0].length;
  let gardenMap = new Map();
  let plants = new Map();
  data.forEach((line, y) => {
    line.split('').forEach((ch, x) => {
      gardenMap.set(`${x},${y}`, ch);
      if (plants.has(ch)) plants.set(ch, [...plants.get(ch), `${x},${y}`]);
      else plants.set(ch, [`${x},${y}`]);
    });
  });
  const types = Array.from(plants.keys());
  types.forEach(p => {
    plants.get(p).at(0);
  });
};
export { getResults, res1, res2 };
