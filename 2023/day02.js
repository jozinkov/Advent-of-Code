let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  const gameMap = new Map(
    data.map(d => {
      let [game, sets] = d.replace('Game ', '').split(': ');
      return [+game, sets.split(';')];
    })
  );
  gameMap.forEach((v, k) => {
    // possible bags for ONLY 12 red / 13 green / 14 blue
    let ok = true;
    // fewest number of cubes of each color
    let red = 0;
    let green = 0;
    let blue = 0;

    v.forEach(set => {
      set.split(',').forEach(s => {
        const [num, color] = s.split(' ').filter(d => d !== '');
        if (color === 'green' && +num > 13) ok = false;
        if (color === 'red' && +num > 12) ok = false;
        if (color === 'blue' && +num > 14) ok = false;
        if (color === 'green' && +num > green) green = +num;
        if (color === 'red' && +num > red) red = +num;
        if (color === 'blue' && +num > blue) blue = +num;
      });
    });
    if (ok) res1 += k;
    res2 += green * red * blue;
  });
};
export { getResults, res1, res2 };
