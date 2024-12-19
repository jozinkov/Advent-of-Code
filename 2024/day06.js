let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  const line = data.findIndex(d => d.includes('^'));
  const pos = [data[line].indexOf('^'), line];

  const coords = new Map();
  data.forEach((valY, y) =>
    valY.split('').forEach((char, x) => coords.set(`${x},${y}`, char))
  );

  let end = false;
  let direction = 1;
  while (end != true) {
    // debugger;
    if (direction === 1) pos[1] = pos[1] - 1;
    if (direction === 2) pos[0] = pos[0] + 1;
    if (direction === 3) pos[1] = pos[1] + 1;
    if (direction === 4) pos[0] = pos[0] - 1;

    if (coords.get(`${pos[0]},${pos[1]}`) === '#') {
      if (direction === 1) pos[1] = pos[1] + 1;
      if (direction === 2) pos[0] = pos[0] - 1;
      if (direction === 3) pos[1] = pos[1] - 1;
      if (direction === 4) pos[0] = pos[0] + 1;
      coords.set(`${pos[0]},${pos[1]}`, '+');
      direction < 4 ? (direction += 1) : (direction = 1);
    } else if (coords.get(`${pos[0]},${pos[1]}`) === undefined) end = true;
    else {
      if (coords.get(`${pos[0]},${pos[1]}`) !== '.') {
        coords.set(`${pos[0]},${pos[1]}`, '+');
      }
      if (direction === 1 || direction === 3)
        coords.set(`${pos[0]},${pos[1]}`, '|');
      if (direction === 2 || direction === 4)
        coords.set(`${pos[0]},${pos[1]}`, '-');
    }
  }

  res1 = Array.from(coords.values()).reduce((acc, cur) => {
    if (cur !== '.' && cur !== '#') return acc + 1;
    else return acc;
  }, 0);
};
export { getResults, res1, res2 };
