let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  let dataset = fileData.split('\n').filter(d => d !== '');

  // east, southeast, southwest, west, northwest, northeast
  let tiles = new Map();
  // add reference tile
  tiles.set('0,0,0', 'white');

  const directions = dataset.map(d => {
    const data = d.split('');
    let steps = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i] === 'e') steps.push('e');
      else if (data[i] === 'w') steps.push('w');
      else if (data[i] + data[i + 1] === 'se') steps.push('se');
      else if (data[i] + data[i + 1] === 'sw') steps.push('sw');
      else if (data[i] + data[i + 1] === 'ne') steps.push('ne');
      else if (data[i] + data[i + 1] === 'nw') steps.push('nw');

      if (data[i] === 's' || data[i] === 'n') i++;
    }
    return steps;
  });

  // find and turn tiles
  directions.forEach(d => {
    let start = [0, 0, 0];

    const setXYZ = (x, y, z) => {
      start[0] += x;
      start[1] += y;
      start[2] += z;
    };
    d.forEach(move => {
      if (move === 'e') setXYZ(1, -1, 0);
      else if (move === 'se') setXYZ(0, -1, 1);
      else if (move === 'sw') setXYZ(-1, 0, 1);
      else if (move === 'w') setXYZ(-1, 1, 0);
      else if (move === 'nw') setXYZ(0, 1, -1);
      else if (move === 'ne') setXYZ(1, 0, -1);
    });

    const tile = start.join(',');
    if (tiles.get(tile) === undefined || tiles.get(tile) === 'white')
      tiles.set(tile, 'black');
    else tiles.set(tile, 'white');
  });

  res1 = [...tiles.values()].filter(v => v === 'black').length;

  //
  const getNeighbours = function (tile) {
    const coords = tile.split(',').map(n => +n);
    const e = `${coords[0] + 1},${coords[1] - 1},${coords[2]}`;
    const se = `${coords[0]},${coords[1] - 1},${coords[2] + 1}`;
    const sw = `${coords[0] - 1},${coords[1]},${coords[2] + 1}`;
    const w = `${coords[0] - 1},${coords[1] + 1},${coords[2]}`;
    const nw = `${coords[0]},${coords[1] + 1},${coords[2] - 1}`;
    const ne = `${coords[0] + 1},${coords[1]},${coords[2] - 1}`;
    return [e, se, sw, w, nw, ne];
  };

  // art exhibit - daily flipping
  const flipping = function (days, tilesF) {
    for (let i = 0; i < days; i++) {
      let blacks = [];
      tilesF.forEach((v, k) => {
        if (v === 'black') blacks.push(k);
      });

      let neighbours = new Map();
      blacks.forEach(b => neighbours.set(b, getNeighbours(b)));

      let blackToWhite = [];
      let whiteToBlack = [];
      neighbours.forEach((v, k) => {
        const blackCount = v.filter(n => tilesF.get(n) === 'black').length;
        if (blackCount === 0 || blackCount > 2) blackToWhite.push(k);
        const whites = v.filter(
          n => tilesF.get(n) === 'white' || tilesF.get(n) === undefined
        );
        if (whites.length > 0)
          whites.forEach(
            w =>
              getNeighbours(w).filter(n => tilesF.get(n) === 'black').length ===
                2 && whiteToBlack.push(w)
          );
      });

      blackToWhite.forEach(k => tilesF.set(k, 'white'));
      whiteToBlack.forEach(k => tilesF.set(k, 'black'));
    }
  };
  flipping(100, tiles);

  res2 = [...tiles.values()].filter(v => v === 'black').length;
};
export { getResults, res1, res2 };
