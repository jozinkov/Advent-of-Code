let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData
    .split('\n')
    .filter(d => d !== '')
    .map(d => d.split(' ').map(n => +n));

  const findNextSeq = function (seq) {
    let diff = [];
    seq.forEach((n, i) => {
      if (i < seq.length - 1) diff.push(seq[i + 1] - n);
    });
    return diff;
  };

  data.forEach(h => {
    let seqs = [h];
    let d = undefined;
    while (true) {
      if (!d) d = findNextSeq(h);
      else d = findNextSeq(d);
      seqs.push(d);
      if (new Set(d).size === 1) break;
    }

    seqs.reverse();
    let next = seqs[0][seqs[0].length - 1];
    let prev = seqs[0][0];

    for (let i = 1; i < seqs.length; i++) {
      next += seqs[i][seqs[i].length - 1];
      prev = seqs[i][0] - prev;
    }
    res1 += next;
    res2 += prev;
  });
};
export { getResults, res1, res2 };
