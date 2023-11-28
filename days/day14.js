let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData.split('\n').filter(d => d !== '');
  let memory1 = new Map();
  let memory2 = new Map();
  let mask, value1, value2;

  const toBitmask = input => input.toString(2).padStart(36, '0').split('');

  dataset.forEach(d => {
    if (d.includes('mask')) mask = d.slice(7).split('');
    if (d.includes('mem')) {
      const [mem, val] = d.match(/\d+/g).map(n => +n);

      //// TASK 1 ////
      value1 = toBitmask(val).map((v, i) => {
        if (mask[i] === 'X') return v;
        else return mask[i];
      });
      memory1.set(mem, parseInt(value1.join(''), 2));

      //// TASK 2 ////
      let indxs = [];
      value2 = toBitmask(mem).map((m, i) => {
        if (mask[i] === '0') return m;
        else return mask[i];
      });
      value2.forEach((b, i) => {
        if (b === 'X') indxs.push(i);
      });

      const again = () => indxs.forEach(ix => (value2[ix] = '0'));
      // number of combinations
      let all = Math.pow(2, indxs.length);

      for (let i = 0; i < all; i++) {
        again();
        let active = i.toString(2).padStart(indxs.length, '0').split('');
        indxs.forEach((ix, i) => {
          if (active[i] === '1') value2[ix] = '1';
        });
        memory2.set(parseInt(value2.join(''), 2), val);
      }
    }
  });
  memory1.forEach(v => (res1 += v));
  memory2.forEach(v => (res2 += v));
};
export { getResults, res1, res2 };
