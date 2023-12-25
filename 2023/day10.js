let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const tiles = fileData.split('\n').filter(d => d !== '');
  let start;

  // Tile coordinates
  const coordsMap = new Map();
  tiles.forEach((line, y) =>
    line.split('').forEach((tile, x) => {
      if (tile === 'S') start = `${x},${y}`;
      coordsMap.set(`${x},${y}`, tile);
    })
  );

  const getNeighbours = function (x, y) {
    // top - right - left - bottom
    return [
      `${x},${y - 1}`,
      `${x + 1},${y}`,
      `${x - 1},${y}`,
      `${x},${y + 1}`,
    ].map(c => (coordsMap.get(c) ? c : undefined));
  };

  let loop = [];
  let end = false;
  let steps = 0;

  // find all possible connections
  const findNext = function (tile) {
    const cur = coordsMap.get(tile);
    const [x, y] = tile.split(',').map(n => +n);
    const [top, right, left, bottom] = getNeighbours(x, y);
    let nexts = [];

    // check for end of the loop
    const checkEnd = function (dir) {
      if (coordsMap.get(dir) === 'S') {
        end = true;
        nexts.push(dir);
      }
    };
    [top, right, left, bottom].forEach(d => checkEnd(d));

    if (!end) {
      // else check adjacent tiles
      let topOK, rightOK, leftOK, bottomOK;
      topOK = rightOK = leftOK = bottomOK = undefined;
      if (cur === 'S') {
        topOK = ['|', '7', 'F', 'S'];
        bottomOK = ['|', 'L', 'J', 'S'];
        leftOK = ['-', 'F', 'L', 'S'];
        rightOK = ['-', '7', 'J', 'S'];
      } else if (cur === '|') {
        topOK = ['|', '7', 'F', 'S'];
        bottomOK = ['|', 'L', 'J', 'S'];
      } else if (cur === '-') {
        leftOK = ['-', 'F', 'L', 'S'];
        rightOK = ['-', '7', 'J', 'S'];
      } else if (cur === '7') {
        leftOK = ['-', 'F', 'L', 'S'];
        bottomOK = ['|', 'L', 'J', 'S'];
      } else if (cur === 'F') {
        rightOK = ['-', '7', 'J', 'S'];
        bottomOK = ['|', 'L', 'J', 'S'];
      } else if (cur === 'L') {
        topOK = ['|', '7', 'F', 'S'];
        rightOK = ['-', '7', 'J', 'S'];
      } else if (cur === 'L') {
        topOK = ['|', '7', 'F', 'S'];
        leftOK = ['-', 'F', 'L', 'S'];
      }

      // if ok, add to next possible
      const addNext = function (dir, dirOK) {
        if (dir && dirOK && dirOK.includes(dir)) nexts.push(dir);
      };
      addNext(top, topOK);
      addNext(bottom, bottomOK);
      addNext(right, rightOK);
      addNext(left, leftOK);
    }

    if ((nexts.length = 0)) return null;
    else return nexts;
  };

  // loop search
  const search = function (connections) {
    // find further connection pipes for each
    connections.forEach(t => {
      if (end) return;
      const nextTiles = findNext(t);
      if (end) return;
      if (!end && nextTiles) search(nextTiles);
      if (!nextTiles) return;
    });
  };
  search(findNext(start));
};
export { getResults, res1, res2 };
