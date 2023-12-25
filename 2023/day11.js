let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  let dataset = fileData.split('\n').filter(d => d !== '');

  const rotate = function (data) {
    const rotated = Array(data[0].length).fill('');
    data.forEach(r => {
      r.split('').forEach((d, i) => (rotated[i] += d));
    });
    return rotated.map(r => r.split('').reverse().join(''));
  };

  // cosmic expansion

  let iRows = [];
  let iCols = [];
  const findIndexes = function (indxs, data) {
    data.forEach((line, i) => line.indexOf('#') === -1 && indxs.push(i));
  };
  findIndexes(iRows, dataset);
  let dataset1 = rotate(dataset);
  findIndexes(iCols, dataset1);

  const addS = function (coord, ins, exp) {
    let newCoord = coord;
    ins.forEach((num, i) => {
      if (coord > num) newCoord += exp - 1;
    });
    return newCoord;
  };

  const findGalaxies = function (exp) {
    let newX, newY;
    let galaxies = [];
    dataset.forEach((line, y) => {
      newY = addS(y, iRows, exp);
      line.split('').forEach((d, x) => {
        if (d === '#') {
          newX = addS(x, iCols, exp);
          galaxies.push([newX, newY]);
        }
      });
    });
    return galaxies;
  };

  const galaxies1 = findGalaxies(2);
  galaxies1.forEach((g, j) => {
    for (let i = 1 + j; i < galaxies1.length; i++)
      res1 +=
        Math.abs(g[0] - galaxies1[i][0]) + Math.abs(g[1] - galaxies1[i][1]);
  });

  const galaxies2 = findGalaxies(1000000);
  galaxies2.forEach((g, j) => {
    for (let i = 1 + j; i < galaxies2.length; i++)
      res2 +=
        Math.abs(g[0] - galaxies2[i][0]) + Math.abs(g[1] - galaxies2[i][1]);
  });
};
export { getResults, res1, res2 };
