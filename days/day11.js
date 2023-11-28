let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData.split('\n').filter(n => n != '');

  let dataMap = new Map(
    dataset
      .map(
        (line, y) =>
          new Map(line.split('').map((ch, x) => [JSON.stringify([x, y]), ch]))
      )
      .flatMap(e => [...e])
  );
  let dataMap2 = new Map(dataMap);
  let changed = new Map(dataMap);

  const findSeat = function (pos, coords, map, side, row) {
    do {
      if (side) side > 0 ? side++ : side--;
      if (row) row > 0 ? row++ : row--;
      pos = map.get(JSON.stringify([coords[0] + side, coords[1] + row]));
    } while (pos === '.');
    return pos;
  };

  const check = function (currentMap, task2 = false) {
    let again = false;
    const max = task2 ? 5 : 4;
    currentMap.forEach((char, coords, map) => {
      if (char === '.') return;

      coords = JSON.parse(coords);

      let p1 = map.get(JSON.stringify([coords[0] - 1, coords[1]])); // LEFT
      let p2 = map.get(JSON.stringify([coords[0] + 1, coords[1]])); // RIGHT
      let p3 = map.get(JSON.stringify([coords[0], coords[1] - 1])); // DOWN
      let p4 = map.get(JSON.stringify([coords[0] - 1, coords[1] - 1])); // DOWN LEFT
      let p5 = map.get(JSON.stringify([coords[0] + 1, coords[1] - 1])); // DOWN RIGHT
      let p6 = map.get(JSON.stringify([coords[0], coords[1] + 1])); // UP
      let p7 = map.get(JSON.stringify([coords[0] - 1, coords[1] + 1])); // UP LEFT
      let p8 = map.get(JSON.stringify([coords[0] + 1, coords[1] + 1])); // UP RIGHT

      if (task2) {
        if (p1 === '.') p1 = findSeat(p1, coords, map, -1, 0);
        if (p2 === '.') p2 = findSeat(p2, coords, map, +1, 0);
        if (p3 === '.') p3 = findSeat(p3, coords, map, 0, -1);
        if (p4 === '.') p4 = findSeat(p4, coords, map, -1, -1);
        if (p5 === '.') p5 = findSeat(p5, coords, map, +1, -1);
        if (p6 === '.') p6 = findSeat(p6, coords, map, 0, +1);
        if (p7 === '.') p7 = findSeat(p7, coords, map, -1, +1);
        if (p8 === '.') p8 = findSeat(p8, coords, map, +1, +1);
      }
      let allpositions = [p1, p2, p3, p4, p5, p6, p7, p8];
      let neighbours = [];
      allpositions.forEach(p => {
        if (p) neighbours.push(p);
      });

      if (char === 'L' && neighbours.every(p => p !== '#')) {
        changed.set(JSON.stringify(coords), '#');
        again = true;
      }
      if (
        char === '#' &&
        neighbours.reduce((acc, p) => {
          if (p === '#') acc++;
          return acc;
        }, 0) >= max
      ) {
        changed.set(JSON.stringify(coords), 'L');
        again = true;
      }
    });
    dataMap = new Map(changed);
    if (again && !task2) check(dataMap);
    else if (again && task2) check(dataMap, true);
    else {
      const result = [...dataMap.values()].reduce((acc, ch) => {
        if (ch === '#') acc++;
        return acc;
      }, 0);
      if (!task2) res1 = result;
      else res2 = result;
      return;
    }
  };
  check(dataMap);
  check(dataMap2, true);
};
export { getResults, res1, res2 };
