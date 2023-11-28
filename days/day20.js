let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  let dataset = fileData.split('\n\n').filter(d => d !== '');

  // Tile number -> TILE
  let tilesMap = new Map(
    dataset.map(d => {
      const tile = d.split(':\n');
      return [+tile[0].replace('Tile ', ''), tile[1]];
    })
  );

  // Tile number -> Tile borders
  const tilesBorders = new Map();
  tilesMap.forEach((v, k) => {
    const rows = v.split('\n');
    const top = rows[0];
    const bottom = rows[rows.length - 1];
    const left = rows.reduce((acc, r) => acc + r[0], '');
    const right = rows.reduce((acc, r) => acc + r[r.length - 1], '');
    tilesBorders.set(k, [top, right, bottom, left]);
  });

  // Count of matches for each border
  let tilesBorderCounts = new Map();
  tilesBorders.forEach((borders, key) => {
    let edges = [];
    borders.forEach(b => {
      let count = 0;
      tilesBorders.forEach((v, k) => {
        if (v === borders) return;
        v.forEach(adjBorder => {
          const reversed = adjBorder.split('').reverse().join('');
          if (b === adjBorder || b === reversed) count++;
        });
      });
      edges.push(count);
    });
    tilesBorderCounts.set(key, edges);
  });
  const cornerTiles = new Map();

  // Store keys in groups
  let allTileKeys = [...tilesMap.keys()];
  let cornerTileKeys = [];
  let otherBorderTileKeys = [];

  // 1st TASK result
  // Find corner tiles and other border tiles
  const keyArr = [...tilesBorderCounts.keys()];
  res1 = [...tilesBorderCounts.values()].reduce((acc, tile, i) => {
    const num = tile.reduce((a, v) => a + v, 0);
    if (num === 2) {
      cornerTiles.set(keyArr[i], tile);
      cornerTileKeys.push(keyArr[i]);
      return acc * keyArr[i];
    } else {
      if (num === 3) otherBorderTileKeys.push(keyArr[i]);
      return acc;
    }
  }, 1);

  let middleKeys = allTileKeys.filter(
    k => !cornerTileKeys.includes(k) && !otherBorderTileKeys.includes(k)
  );

  ////////////////////////////////////
  // ASSEMBLE THE IMAGE
  ////////////////////////////////////

  // Rotate / flip tile FUNCTION
  const flip = function (move, data) {
    if (move === 'horizontal') return data.reverse().join('\n');
    if (move === 'vertical')
      return data.map(r => r.split('').reverse().join('')).join('\n');
  };
  const rotate = function (move, data) {
    const rotated = Array(data[0].length).fill('');
    if (move === 'clock') {
      data.forEach(r => {
        r.split('').forEach((d, i) => (rotated[i] += d));
      });
      return rotated.map(r => r.split('').reverse().join('')).join('\n');
    }
    if (move === 'counter') {
      data.forEach(r => {
        r.split('')
          .reverse()
          .forEach((d, i) => (rotated[i] += d));
      });
      return rotated.join('\n');
    }
  };

  const orientation = function (tile, prevSide, newSide, reversed) {
    // 0=TOP 1=RIGHT 2=BOTTOM 3=LEFT
    const tileRows = tile.split('\n');

    if (newSide === prevSide && !reversed) return tile;
    if (newSide === prevSide && reversed) {
      if (newSide === 1 || newSide === 3) return flip('horizontal', tileRows);
      if (newSide === 0 || newSide === 2) return flip('vertical', tileRows);
    }
    if (newSide !== prevSide && !reversed) {
      if (newSide % 2 > 0 && prevSide % 2 > 0)
        return flip('vertical', tileRows);
      if (newSide % 2 === 0 && prevSide % 2 === 0)
        return flip('horizontal', tileRows);
      if (prevSide - newSide === 1 || (newSide === 3 && prevSide === 0))
        return rotate('counter', tileRows);
      if (newSide - prevSide === 1 || (newSide === 0 && prevSide === 3))
        return rotate('clock', tileRows);
    }
    if (newSide !== prevSide && reversed) {
      let newTile;
      if (
        (newSide % 2 > 0 && prevSide % 2 > 0) ||
        (newSide % 2 === 0 && prevSide % 2 === 0)
      ) {
        newTile = flip('vertical', tileRows).split('\n');
        return flip('horizontal', newTile);
      }
      if (prevSide - newSide === 1 || (newSide === 3 && prevSide === 0)) {
        if (prevSide % 2 > 0)
          newTile = flip('horizontal', tileRows).split('\n');
        if (prevSide % 2 === 0)
          newTile = flip('vertical', tileRows).split('\n');
        return rotate('counter', newTile);
      }
      if (newSide - prevSide === 1 || (newSide === 0 && prevSide === 3)) {
        if (prevSide % 2 > 0)
          newTile = flip('horizontal', tileRows).split('\n');
        if (prevSide % 2 === 0)
          newTile = flip('vertical', tileRows).split('\n');
        return rotate('clock', newTile);
      }
    }
  };

  // Empty IMAGE MAP with coordinates
  const square = Math.sqrt(dataset.length);
  const imageMap = new Map();
  for (let y = 0; y < square; y++)
    for (let x = 0; x < square; x++) imageMap.set(`${x},${y}`, undefined);

  // Start with top-left corner tile
  const topLeft = [...cornerTiles].find(
    ([k, t]) => t[0] === 0 && t[3] === 0
  )[0];
  // Initial coordinates
  let x = 0;
  let y = 0;
  //
  let curStartTileKey = topLeft;
  let sideToMatch;
  // Add 1st tile to IMAGE MAP
  imageMap.set(`${x},${y}`, tilesMap.get(topLeft));
  x++;

  // Remove key
  const removeUsedKey = function (key) {
    if (middleKeys.includes(key)) middleKeys.splice(middleKeys.indexOf(key), 1);
    if (cornerTileKeys.includes(key))
      cornerTileKeys.splice(cornerTileKeys.indexOf(key), 1);
    if (otherBorderTileKeys.includes(key))
      otherBorderTileKeys.splice(otherBorderTileKeys.indexOf(key), 1);
  };
  removeUsedKey(topLeft);

  // Change order of borders for reversed tile
  const getBorders = function (k, v) {
    const rows = v.split('\n');
    const top = rows[0];
    const bottom = rows[rows.length - 1];
    const left = rows.reduce((acc, r) => acc + r[0], '');
    const right = rows.reduce((acc, r) => acc + r[r.length - 1], '');
    tilesBorders.set(k, [top, right, bottom, left]);
  };

  // Find adjacent tiles
  /////////////////////////////////////////
  const assembleImage = function (curTileKey, arrTileKeys) {
    // Get RIGHT or BOTTOM side of current tile
    const side =
      x === 0
        ? tilesBorders.get(curTileKey)[2]
        : tilesBorders.get(curTileKey)[1];

    if (x > 0) sideToMatch = 3; // LEFT
    if (x === 0) sideToMatch = 0; // TOP

    const addTile = function (key, i, reversed) {
      let check;
      if ((i === 3 && sideToMatch === 0) || (i === 1 && sideToMatch === 2)) {
        if (reversed && i === 3 && sideToMatch === 0) check = false;
        if (!reversed && i === 3 && sideToMatch === 0) check = true;
        if (!reversed && i === 1 && sideToMatch === 2) check = true;
        if (reversed && i === 1 && sideToMatch === 2) check = false;
      } else {
        check = reversed;
      }

      let nextTile = orientation(tilesMap.get(key), i, sideToMatch, check);
      getBorders(key, nextTile);
      imageMap.set(`${x},${y}`, nextTile);
      removeUsedKey(key);

      if (x === 0) curStartTileKey = key;
      x++; // set coords for NEXT tile

      if (y === 0 || y === square - 1) {
        if (x < square - 1) return assembleImage(key, otherBorderTileKeys);
        if (x === square - 1) return assembleImage(key, cornerTileKeys);
        if (x === square) {
          y++; // set coords for NEXT tile
          x = 0;
          if (y === 1)
            return assembleImage(curStartTileKey, otherBorderTileKeys);
          else return;
        }
      } else {
        if (x < square - 1) return assembleImage(key, middleKeys);
        if (x === square - 1) return assembleImage(key, otherBorderTileKeys);
        if (x === square) {
          y++; // set coords for NEXT tile
          x = 0;
          if (y < square - 1)
            return assembleImage(curStartTileKey, otherBorderTileKeys);
          if (y === square - 1)
            return assembleImage(curStartTileKey, cornerTileKeys);
        }
      }
    };

    arrTileKeys.forEach(k => {
      tilesBorders.get(k).forEach((border, i) => {
        if (side === border) {
          addTile(k, i, false);
          return;
        }
        const reversed = border.split('').reverse().join('');
        if (side === reversed) {
          addTile(k, i, true);
          return;
        }
      });
    });
  };
  assembleImage(curStartTileKey, otherBorderTileKeys);

  // Last corrections - vertical flip
  const getSide = function (v, side) {
    const rows = v.split('\n');
    if (side === 'left') return rows.reduce((acc, r) => acc + r[0], '');
    if (side === 'right')
      return rows.reduce((acc, r) => acc + r[r.length - 1], '');
  };
  imageMap.forEach((v, k) => {
    const [x, y] = k.split(',').map(n => +n);
    const next = imageMap.get(`${x + 1},${y}`);
    if (x !== 11 && getSide(v, 'right') !== getSide(next, 'left'))
      imageMap.set(`${x + 1},${y}`, flip('horizontal', next.split('\n')));
  });

  // Remove borders of each tile
  let noBordersMap = new Map();
  imageMap.forEach((v, k) => {
    const newValue = v
      .split('\n')
      .slice(1, -1)
      .map(r => r.slice(1, -1))
      .join('\n');
    noBordersMap.set(k, newValue);
  });

  // Remove the gaps
  let imageRow = new Array(8);
  const imageCoords = [...noBordersMap.keys()];
  let almost = [];
  [...noBordersMap.values()].forEach((tile, i) => {
    const x = +imageCoords[i].split(',')[0];
    if (x === 0) {
      imageRow.fill('');
      tile.split('\n').forEach((r, j) => (imageRow[j] += r));
    } else if (x % 11 === 0) {
      tile.split('\n').forEach((r, j) => (imageRow[j] += r));
      almost = almost.concat(imageRow);
    } else {
      tile.split('\n').forEach((r, j) => (imageRow[j] += r));
    }
  });

  // The IMAGE of water
  let image = almost.join('\n');

  // The SEA MONSTER
  const monsterNum = 15;

  // Find monsters
  const findMonsters = function (sea) {
    let monsterCount = 0;
    const seaLength = sea.length;
    sea.forEach((row, i) => {
      row.split('').forEach((ch, a) => {
        if (ch === '#' && i < seaLength - 1) {
          const row2 = sea[i + 1].split('');
          if (
            row2[a - 18] === '#' &&
            row2[a - 13] === '#' &&
            row2[a - 12] === '#' &&
            row2[a - 7] === '#' &&
            row2[a - 6] === '#' &&
            row2[a - 1] === '#' &&
            row2[a] === '#' &&
            row2[a + 1] === '#'
          ) {
            const row3 = sea[i + 2].split('');
            if (
              row3[a - 17] === '#' &&
              row3[a - 14] === '#' &&
              row3[a - 11] === '#' &&
              row3[a - 8] === '#' &&
              row3[a - 5] === '#' &&
              row3[a - 2] === '#'
            ) {
              monsterCount++;
            }
          }
        }
      });
    });
    return monsterCount;
  };

  // Image versions
  const imgRows = image.split('\n');
  const flipH = flip('horizontal', imgRows);
  const flipV = flip('vertical', imgRows);
  const rotateCl = rotate('clock', imgRows);
  const rotateCo = rotate('counter', imgRows);
  const flipHV = flip('vertical', flipH.split('\n'));
  const flipHrotateCl = rotate('clock', flipH.split('\n'));
  const flipVrotateCl = rotate('clock', flipV.split('\n'));

  const imgVersions = [
    imgRows,
    flipH.split('\n'),
    flipV.split('\n'),
    rotateCl.split('\n'),
    rotateCo.split('\n'),
    flipHV.split('\n'),
    flipHrotateCl.split('\n'),
    flipVrotateCl.split('\n'),
  ];
  let imgVsMonsterCount = [];
  imgVersions.forEach(img => imgVsMonsterCount.push(findMonsters(img)));

  // The habitat's water roughness
  const mNum = imgVsMonsterCount.find(c => c > 0) * monsterNum;
  res2 =
    image.split('').reduce((acc, ch) => {
      if (ch === '#') acc++;
      return acc;
    }, 0) - mNum;
};
export { getResults, res1, res2 };
