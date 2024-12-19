let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  let robots = fileData
    .split('\n')
    .filter(d => d !== '')
    .map((r, i) => {
      const [p, v] = r.split(' ').map(e =>
        e.startsWith('p')
          ? e
              .replace('p=', '')
              .split(',')
              .map(n => Number(n))
          : e
              .replace('v=', '')
              .split(',')
              .map(n => Number(n))
      );
      return { p, v };
    });
  const maxX = 101;
  const maxY = 103;
  const midX = Math.trunc(maxX / 2);
  const midY = Math.trunc(maxY / 2);

  for (let i = 0; i < 100; i++) {
    robots.forEach(r => {
      const rX = r.p[0] + r.v[0];
      const rY = r.p[1] + r.v[1];
      const x = rX > maxX - 1 ? rX - maxX : rX < 0 ? maxX - Math.abs(rX) : rX;
      const y = rY > maxY - 1 ? rY - maxY : rY < 0 ? maxY - Math.abs(rY) : rY;
      r.p[0] = x;
      r.p[1] = y;
    });

    // let sum = 1;
    // let count = 1;
    // while (sum < 250) {
    //   sum += 2;
    //   count++;
    // }
    // console.log(sum, count);

    let isEasterEgg = false;
    let line = 0;
    for (let y = 0; y < maxY; y++) {
      if (robots.reduce((acc, r) => r.p[1] === y && acc + 1, 0) === 1) {
        isEasterEgg = true;
        line = y;
      }
    }
  }

  let counts = [0, 0, 0, 0];
  robots.forEach(r => {
    if (r.p[0] < midX && r.p[1] < midY) counts[0] += 1;
    if (r.p[0] > midX && r.p[1] < midY) counts[1] += 1;
    if (r.p[0] < midX && r.p[1] > midY) counts[2] += 1;
    if (r.p[0] > midX && r.p[1] > midY) counts[3] += 1;
  });
  res1 = counts.reduce((res, v) => res * v, 1);
};
export { getResults, res1, res2 };
