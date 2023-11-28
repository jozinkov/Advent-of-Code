let res1 = 0;
let res2 = 1;

const getResults = function (fileData) {
  const dataset = fileData.split('\n\n');
  const rulesMap = new Map(dataset[0].split('\n').map(r => r.split(': ')));
  const myTicket = dataset[1]
    .split('\n')[1]
    .split(',')
    .map(n => +n);
  const nearbyTickets = dataset[2]
    .split('\n')
    .filter(r => r != '')
    .slice(1)
    .map(t => t.split(',').map(n => +n));

  rulesMap.forEach((v, k) =>
    rulesMap.set(
      k,
      v.match(/\d+/g).map(n => +n)
    )
  );

  let invalidTickets = new Array();
  let count;
  let check;
  nearbyTickets.forEach((t, i) => {
    check = false;
    t.forEach(n => {
      count = 0;
      rulesMap.forEach(v => {
        if (n < v[0] || (n > v[1] && n < v[2]) || n > v[3]) count++;
      });
      if (count === rulesMap.size) {
        res1 += n;
        check = true;
      }
    });
    if (check) invalidTickets.push(i);
  });

  let validIds = new Array(rulesMap.size);
  let counts = new Map();
  let all;
  rulesMap.forEach((v, k) => {
    validIds.fill(0);
    all = [];
    myTicket.forEach((n, i) => {
      if ((n >= v[0] && n <= v[1]) || (n >= v[2] && n <= v[3]))
        validIds[i] += 1;
    });
    nearbyTickets.forEach((t, ix) => {
      if (!invalidTickets.includes(ix)) {
        t.forEach((n, i) => {
          if ((n >= v[0] && n <= v[1]) || (n >= v[2] && n <= v[3]))
            validIds[i] += 1;
        });
      }
    });
    validIds.forEach((id, i) => {
      if (id === nearbyTickets.length - invalidTickets.length + 1) all.push(i);
    });
    counts.set(k, all);
  });

  const mapSort = new Map(
    [...counts.entries()].sort((a, b) => a[1].length - b[1].length)
  );
  mapSort.forEach((v, k) => {
    mapSort.forEach((x, kx) => {
      if (kx != k) {
        if (x.indexOf(v[0]) !== -1) x.splice(x.indexOf(v[0]), 1);
        mapSort.set(kx, x);
      }
    });
  });
  mapSort.forEach((v, k) => {
    if (k.includes('departure')) res2 *= myTicket[v[0]];
  });
};
export { getResults, res1, res2 };
