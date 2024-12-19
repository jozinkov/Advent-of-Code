let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  let forTask2 = [];

  data.forEach(cur => {
    const eq = cur.split(': ');
    const value = Number(eq[0]);
    const nums = eq[1].split(' ').map(n => Number(n));

    let opts = [];
    let index = 0;
    function recursive(istr, curstr, count) {
      count--;
      for (let i = 0; i < istr.length; i++) {
        let str = curstr + istr.charAt(i);
        if (count > 0) recursive(istr, str, count);
        else opts[index++] = str;
      }
    }
    recursive('+*', '', nums.length - 1);

    let ok = false;

    for (let i = 0; i < opts.length; i++) {
      const res = nums.reduce((a, c, x) => {
        if (opts[i].length === x) return a + c + ')';
        else return a + c + ')' + opts[i][x];
      }, '(');
      const start = '('.repeat(opts[0].length);

      if (eval(start + res) === value) {
        ok = true;
        break;
      }
    }

    if (ok) {
      res1 += value;
      res2 += value;
    } else forTask2.push(cur);
  });

  forTask2.forEach(cur => {
    const eq = cur.split(': ');
    const value = Number(eq[0]);
    const nums = eq[1].split(' ').map(n => Number(n));

    let opts = [];
    let index = 0;
    function recursive(istr, curstr, count) {
      count--;
      for (let i = 0; i < istr.length; i++) {
        let str = curstr + istr.charAt(i);
        if (count > 0) recursive(istr, str, count);
        else opts[index++] = str;
      }
    }
    recursive('|+*', '', nums.length - 1);

    let ok = false;
    for (let i = 0; i < opts.length; i++) {
      let res = nums[0];
      for (let j = 0; j < nums.length - 1; j++) {
        if (opts[i][j] === '|') res = Number(`${res}${nums[j + 1]}`);
        else res = eval(`${res}${opts[i][j]}${nums[j + 1]}`);
      }
      if (res === value) {
        ok = true;
        break;
      }
    }

    if (ok) res2 += value;
  });
};
export { getResults, res1, res2 };
