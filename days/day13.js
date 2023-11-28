let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData.split('\n').filter(d => d !== '');

  const timestamp = +dataset[0];
  const buses = dataset[1]
    .split(',')
    .filter(b => b != 'x')
    .map(b => +b);
  let check = false;
  let stamp = timestamp;

  let distance = 0;
  const delays = [];
  dataset[1].split(',').forEach(b => {
    if (b === 'x') {
      distance++;
      return;
    } else {
      delays.push(distance);
      distance++;
    }
  });

  const findBUS = function (time) {
    buses.forEach(b => {
      if (time % b === 0) {
        if (time > timestamp) res1 = (time - timestamp) * b;
        else res1 = time * b;
        check = true;
        return;
      }
    });
  };
  do {
    findBUS(stamp);
    stamp++;
  } while (check === false);
  ////////////////
  /*
  const firstBUS = buses[0]; // 17
  // BUSES [(17), 37, 571, 13, 23, 29, 401, 41, 19]
  // DELAYS [(0), 11, 17, 35, 40, 46, 48, 58, 67]
  buses.shift();
  delays.shift();
*/
  // timestamp % BUS === delay
  let t = BigInt;

  /*
  let multiplier = [];
  buses.forEach((b, i) => {
    let num = b;
    let index = 1;
    do {
      num += b;
      index++;
    } while ((num - delays[i]) % firstBUS !== 0);
    multiplier.push(index);
  });
  // FIRST MULTIPLIER [(0), 15, 17, 4, 18, 18, 15, 18, 8]

  // 1st -- (BUS * multiplier) - delay = timestamp
  // rest -- (BUS * (multiplier + (firstBUS*i))) - delay = timestamp

  let t = 99999999999781 - delays[1];
  for (let i = 1; t > 0; i++) {
    console.log(t);
    if (delays.every((d, i) => (t + d) % buses[i] === 0)) break;
    t += buses[1] * firstBUS - delays[1];
  }
  console.log('success', t);
  */
};
export { getResults, res1, res2 };
