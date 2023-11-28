let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData
    .split('\n')
    .filter(n => n != '')
    .map(c => [c.slice(0, 1), +c.slice(1)]);

  let compass = new Map([
    ['E', 0],
    ['W', 0],
    ['S', 0],
    ['N', 0],
  ]);
  const directions = new Map([
    [1, 'E'],
    [2, 'S'],
    [3, 'W'],
    [4, 'N'],
  ]);
  let current = 1;

  const manhattan = () =>
    Math.abs(compass.get('E') - compass.get('W')) +
    Math.abs(compass.get('S') - compass.get('N'));

  const changeDirection = (curr, num, side) => {
    if (side === 'L') curr += 4 - num / 90;
    if (side === 'R') curr += num / 90;
    if (curr > 4) curr -= 4;
    return curr;
  };

  dataset.forEach(d => {
    const direction = directions.get(current);
    if (d[0] === 'F') compass.set(direction, compass.get(direction) + d[1]);
    else if (d[0] === 'L' || d[0] === 'R')
      current = changeDirection(current, d[1], d[0]);
    else compass.set(d[0], compass.get(d[0]) + d[1]);
  });
  res1 = manhattan();
  ////////////

  let waypoint = new Map([
    [1, 10],
    [4, 1],
  ]);
  compass.forEach((v, k) => compass.set(k, 0));

  dataset.forEach(d => {
    const direction = Array.from(waypoint.keys());
    let curr1 = directions.get(direction[0]);
    let curr2 = directions.get(direction[1]);
    if (d[0] === 'F') {
      compass.set(
        curr1,
        compass.get(curr1) + waypoint.get(direction[0]) * d[1]
      );
      compass.set(
        curr2,
        compass.get(curr2) + waypoint.get(direction[1]) * d[1]
      );
    } else if (d[0] === 'L' || d[0] === 'R') {
      const curr1value = waypoint.get(direction[0]);
      const curr2value = waypoint.get(direction[1]);
      waypoint.clear();
      waypoint.set(changeDirection(direction[0], d[1], d[0]), curr1value);
      waypoint.set(changeDirection(direction[1], d[1], d[0]), curr2value);
    } else {
      if (curr1 === d[0])
        waypoint.set(direction[0], waypoint.get(direction[0]) + d[1]);
      else if (curr2 === d[0])
        waypoint.set(direction[1], waypoint.get(direction[1]) + d[1]);
      else {
        let old, add;
        if (d[0] === 'S' || d[0] === 'N') {
          old = d[0] === 'S' ? 4 : 2;
          add = old === 4 ? 2 : 4;
        }
        if (d[0] === 'E' || d[0] === 'W') {
          old = d[0] === 'E' ? 3 : 1;
          add = old === 3 ? 1 : 3;
        }
        if (waypoint.get(old) < d[1]) {
          waypoint.set(add, Math.abs(waypoint.get(old) - d[1]));
          waypoint.delete(old);
        } else waypoint.set(old, Math.abs(waypoint.get(old) - d[1]));
      }
    }
  });
  res2 = manhattan();
};
export { getResults, res1, res2 };
