let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n\n').filter(d => d !== '');
  const moves = data[0].split('');
  const nodes = new Map(
    data[1]
      .split('\n')
      .filter(d => d !== '')
      .map(m => {
        const [nod, next] = m.split(' = ');
        const l = next.length - 1;
        return [nod, next.slice(1, l).split(', ')];
      })
  );

  let cur = 'AAA';
  const wayOut = function () {
    moves.forEach((m, i) => {
      const n = nodes.get(cur);
      res1++;
      if (m === 'L') cur = n[0];
      if (m === 'R') cur = n[1];
      if (moves[i + 1] === undefined && cur !== 'ZZZ') return wayOut();
      else if (cur === 'ZZZ') return;
    });
  };
  wayOut();

  const nodesA = [...nodes.keys()].filter(k => k.endsWith('A'));
  let count;
  nodesA.forEach(nA => {
    console.log('A node:', nA);
    count = 0;
    const wayOutZ = function () {
      moves.forEach((m, i) => {
        count++;
        const n = nodes.get(nA);
        if (m === 'L') cur = n[0];
        if (m === 'R') cur = n[1];
        if (moves[i + 1] === undefined && !nA.endsWith('Z')) return wayOutZ();
        else if (nA.endsWith('Z')) console.log(count);
        else if (count > 10000) return;
      });
    };
    wayOutZ();
  });

  //   let ndsZ = [...nodes.keys()].filter(k => k.endsWith('A'));
  //   console.log(ndsZ);
  //   console.log(ndsZ.length);
  //   let newNds = [];

  //   let counts;
  //   let nAZ;
  //   let nextNdsZ;
  //   const findZ = function (nds) {
  //     console.log(nds);
  //     nextNdsZ = [];
  //     counts = [];
  //     nds.forEach(n => {
  //       nAZ = [];
  //       nAZ.push(n);
  //       let newND = undefined;
  //       let end = undefined;
  //       const nodeToZ = function () {
  //         moves.forEach((m, i) => {
  //           if (newND) n = newND;

  //           const nn = nodes.get(n);
  //           if (m === 'L') newND = nn[0];
  //           if (m === 'R') newND = nn[1];
  //           nAZ.push(newND);

  //           end = newND.endsWith('Z');
  //           if (moves[i + 1] === undefined && !end) return;
  //           else if (end) {
  //             nextNdsZ.push(newND);
  //             return;
  //           }
  //         });
  //         if (end) {
  //           //   console.log(nAZ.filter(d => d.endsWith('Z')));
  //           counts.push(nAZ.length);
  //           return true;
  //         } else return false;
  //       };
  //       while (true) {
  //         if (nodeToZ()) break;
  //       }
  //     });
  //     // console.log(counts);
  //   };
  //   findZ(ndsZ);
  //   findZ(nextNdsZ);
  //   findZ(nextNdsZ);

  //   const wayOut2 = function () {
  //     moves.forEach((m, i) => {
  //       res2++;
  //       if (newNds.length !== 0) {
  //         nds = newNds;
  //         newNds = [];
  //       }
  //       nds.forEach(n => {
  //         const nn = nodes.get(n);
  //         if (m === 'L') newNds.push(nn[0]);
  //         if (m === 'R') newNds.push(nn[1]);
  //       });

  //       end = newNds.every(n => n.endsWith('Z'));
  //       if (moves[i + 1] === undefined && !end) return;
  //       else if (end) return;
  //     });
  //     if (end) return true;
  //     else return false;
  //   };
  //   while (true) {
  //     console.log(res2, end);
  //     if (wayOut2()) break;
  //   }

  //   const lcm = (...arr) => {
  //     const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  //     const _lcm = (x, y) => (x * y) / gcd(x, y);
  //     return [...arr].reduce((a, b) => _lcm(a, b));
  //   };

  //   console.log(BigInt(lcm(...counts)).toString());
  //   console.log('end');
};
export { getResults, res1, res2 };
