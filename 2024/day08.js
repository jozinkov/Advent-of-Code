let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  const maxY = data.length;
  const maxX = data[0].length;

  const antns = new Set(
    data.reduce(
      (acc, cur) => acc.concat(cur.split('').filter(ch => ch !== '.')),
      []
    )
  );
  const antennas = Array.from(antns.values());
  const aMap = new Map();
  let antidotes = [];

  antennas.forEach(a => {
    aMap.set(a, []);
    data.forEach((l, y) => {
      l.split('').forEach((ch, x) => {
        if (ch === a) aMap.set(a, [...aMap.get(a), [x, y]]);
      });
    });
  });

  const addAntidote = (x, y) => {
    const antiCoords = `${x},${y}`;
    if (antidotes.indexOf(antiCoords) === -1) antidotes.push(antiCoords);
  };

  aMap.forEach(v => {
    const maxIndex = v.length - 1;
    v.forEach((c, i, arr) => {
      // PART 2
      //
      addAntidote(c[0], c[1]);
      if (i < maxIndex) {
        for (let a = i; a < maxIndex; a++) {
          const diffX = arr[a + 1][0] - c[0];
          const diffY = arr[a + 1][1] - c[1];

          if (diffY === 0) {
            let antiX = c[0] - diffX;
            let antiX2 = arr[a + 1][0] + diffX;
            let antiY = c[1];
            while (antiX >= 0) {
              addAntidote(antiX, antiY);
              antiX -= diffX;
            }
            while (antiX2 < maxX) {
              addAntidote(antiX2, antiY);
              antiX2 += diffX;
            }
          }

          if (diffX > 0 && diffY > 0) {
            let antiX = c[0] - diffX;
            let antiY = c[1] - diffY;
            let antiX2 = arr[a + 1][0] + diffX;
            let antiY2 = arr[a + 1][1] + diffY;
            while (antiX >= 0 && antiY >= 0) {
              addAntidote(antiX, antiY);
              antiX -= diffX;
              antiY -= diffY;
            }
            while (antiX2 < maxX && antiY2 < maxY) {
              addAntidote(antiX2, antiY2);
              antiX2 += diffX;
              antiY2 += diffY;
            }
          }

          if (diffX < 0 && diffY > 0) {
            let antiX = c[0] + Math.abs(diffX);
            let antiY = c[1] - diffY;
            let antiX2 = arr[a + 1][0] - Math.abs(diffX);
            let antiY2 = arr[a + 1][1] + diffY;
            while (antiX < maxX && antiY >= 0) {
              addAntidote(antiX, antiY);
              antiX += Math.abs(diffX);
              antiY -= diffY;
            }
            while (antiX2 >= 0 && antiY2 < maxY) {
              addAntidote(antiX2, antiY2);
              antiX2 -= Math.abs(diffX);
              antiY2 += diffY;
            }
          }
          // PART 1
          //
          //   if (diffY === 0) {
          //     const antiX = c[0] - diffX;
          //     const antiX2 = arr[a + 1][0] + diffX;
          //     const antiY = c[1];
          //     if (antiX >= 0) addAntidote(antiX, antiY);
          //     if (antiX2 < maxX) addAntidote(antiX2, antiY);
          //   }

          //   if (diffX > 0 && diffY > 0) {
          //     const antiX = c[0] - diffX;
          //     const antiY = c[1] - diffY;
          //     const antiX2 = arr[a + 1][0] + diffX;
          //     const antiY2 = arr[a + 1][1] + diffY;
          //     if (antiX >= 0 && antiY >= 0) addAntidote(antiX, antiY);
          //     if (antiX2 < maxX && antiY2 < maxY) addAntidote(antiX2, antiY2);
          //   }

          //   if (diffX < 0 && diffY > 0) {
          //     const antiX = c[0] + Math.abs(diffX);
          //     const antiY = c[1] - diffY;
          //     const antiX2 = arr[a + 1][0] - Math.abs(diffX);
          //     const antiY2 = arr[a + 1][1] + diffY;
          //     if (antiX < maxX && antiY >= 0) addAntidote(antiX, antiY);
          //     if (antiX2 >= 0 && antiY2 < maxY) addAntidote(antiX2, antiY2);
          //   }
        }
      }
    });
  });
  res1 = antidotes.length;
};
export { getResults, res1, res2 };
