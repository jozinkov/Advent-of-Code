let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData.split('\n').filter(d => d != '');
  let dataMap = new Map(
    dataset
      .map(
        (line, y) =>
          new Map(
            line.split('').map((ch, x) => [JSON.stringify([x, -y, 0, 0]), ch])
          )
      )
      .flatMap(e => [...e])
  );
  dataMap.forEach((v, k) => {
    if (v === '.') dataMap.delete(k);
  });
  let coordsActive3D = [...dataMap.keys()].map(d =>
    JSON.stringify(JSON.parse(d).slice(0, 3))
  );
  let coordsActive4D = [...dataMap.keys()];

  // if ACTIVE + exactly 2 or 3 neighbors are active -> remains active. Else -> becomes inactive
  // if INACTIVE + exactly 3 neighbors are active -> becomes active. Else -> remains inactive

  const getNeighboursOfCube = function (c, d, neighbours = []) {
    const coords = JSON.parse(c);

    if (d === 3) {
      for (let z = coords[2] - 1; z < coords[2] + 2; z++)
        for (let y = coords[1] - 1; y < coords[1] + 2; y++)
          for (let x = coords[0] - 1; x < coords[0] + 2; x++) {
            const cube = JSON.stringify([x, y, z]);
            if (!neighbours.includes(cube)) neighbours.push(cube);
          }
    }
    if (d === 4) {
      for (let w = coords[3] - 1; w < coords[3] + 2; w++)
        for (let z = coords[2] - 1; z < coords[2] + 2; z++)
          for (let y = coords[1] - 1; y < coords[1] + 2; y++)
            for (let x = coords[0] - 1; x < coords[0] + 2; x++) {
              const cube = JSON.stringify([x, y, z, w]);
              if (!neighbours.includes(cube)) neighbours.push(cube);
            }
    }
    return neighbours;
  };

  const runCycles = function (activeCubes, cycles = 1, dimension = 3) {
    let state = [];
    let deactivate = [];
    let activate = [];

    activeCubes.forEach(
      c => (state = getNeighboursOfCube(c, dimension, state))
    );

    state.forEach(c => {
      const active = activeCubes.includes(c) ? true : false;
      let activeNeighbours = 0;

      getNeighboursOfCube(c, dimension).forEach(v => {
        if (c === v) return;
        if (activeCubes.includes(v)) activeNeighbours++;
      });

      if (active && activeNeighbours !== 2 && activeNeighbours !== 3)
        deactivate.push(c);
      if (!active && activeNeighbours === 3) activate.push(c);
    });

    deactivate.forEach(e => activeCubes.splice(activeCubes.indexOf(e), 1));
    activate.forEach(e => activeCubes.push(e));

    cycles--;
    if (cycles !== 0) runCycles(activeCubes, cycles, dimension);
    else if (dimension === 3) res1 = activeCubes.length;
    else if (dimension === 4) res2 = activeCubes.length;
  };
  runCycles(coordsActive3D, 6);
  runCycles(coordsActive4D, 6, 4);
};
export { getResults, res1, res2 };
