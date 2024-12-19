let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.replaceAll(/\s/g, '');
  const blocks = data.split('');

  let id = -1;
  let str = blocks.reduce((acc, cur, i) => {
    if (i % 2) return [...acc, ['.', +cur]];
    else {
      id++;
      return [...acc, [id, +cur]];
    }
  }, []);
  let str2 = str;

  // part 1
  let n1, n2;
  let end = (str.length - 1) % 2 === 0 ? str.length - 1 : str.length - 2;
  let i = 1;
  while (i < str.length - 1) {
    if (i > end) break;
    if (str[end][1] <= 0) end -= 2;
    n1 = str[i][1];
    n2 = str[end][1];
    if (n2 >= n1) {
      str[i][0] = str[end][0];
      str[end][1] -= n1;
      i += 2;
    } else if (n2 < n1) {
      const diff = n1 - n2;
      str[i][0] = str[end][0];
      str[i][1] = n2;
      str[end][1] -= n1;
      str.splice(i + 1, 0, ['.', diff]);
      end++;
      i++;
    }
  }
  const q = str.findIndex(v => v[0] === '.');
  let index = -1;
  res1 = str.slice(0, q).reduce((a, c) => {
    const val = Array.from({ length: c[1] }, () => {
      index++;
      return index;
    }).reduce((acc, cur) => acc + Number(c[0]) * Number(cur), 0);
    return a + val;
  }, 0);

  // part 2
  end = (str2.length - 1) % 2 === 0 ? str2.length - 1 : str2.length - 2;
  i = 1;
  while (end > 2) {
    if (i > end) {
      end = str2.findLastIndex((e, j) => j < end && e[0] !== '.');
      i = str2.findIndex(e => e[0] === '.');
      if (i > end) break;
    }
    n1 = str2[i][1];
    n2 = str2[end][1];
    if (n2 > n1) {
      i = str2.findIndex((e, j) => j > i && e[0] === '.');
    } else if (n2 === n1) {
      str2[i][0] = str2[end][0];
      str2[end][0] = '.';
      end = str2.findLastIndex((e, j) => j < end && e[0] !== '.');
      i = str2.findIndex(e => e[0] === '.');
    } else if (n2 < n1) {
      const diff = n1 - n2;
      str2[i][0] = str2[end][0];
      str2[i][1] = n2;
      str2[end][0] = '.';
      str2.splice(i + 1, 0, ['.', diff]);
      end = str2.findLastIndex((e, j) => j < end && e[0] !== '.');
      i = str2.findIndex(e => e[0] === '.');
    }
  }

  index = -1;
  res2 = str2.reduce((a, c) => {
    const val = Array.from({ length: c[1] }, () => {
      index++;
      return index;
    }).reduce((acc, cur) => {
      if (c[0] !== '.') return acc + Number(c[0]) * Number(cur);
      else return acc;
    }, 0);
    return a + val;
  }, 0);
};
export { getResults, res1, res2 };
