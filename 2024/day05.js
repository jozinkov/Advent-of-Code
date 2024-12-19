let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n\n');
  const rules = data[0]
    .split('\n')
    .filter(d => d !== '')
    .map(u => u.split('|').map(n => Number(n)));
  const updates = data[1]
    .split('\n')
    .filter(d => d !== '')
    .map(u => u.split(',').map(n => Number(n)));

  const check = function (page, i, update) {
    const after = rules.filter(r => r[0] === page).map(e => e[1]);
    const before = rules.filter(r => r[1] === page).map(e => e[0]);

    if (
      (after.length === 0 ||
        after.every(p => {
          if (update.indexOf(p) === -1) return true;
          return update.indexOf(p) > i;
        })) &&
      (before.length === 0 ||
        before.every(p => {
          if (update.indexOf(p) === -1) return true;
          return update.indexOf(p) < i;
        }))
    )
      return true;
    else return false;
  };

  updates.forEach(u => {
    let total = u.length;
    let count = 0;

    u.forEach((page, i, update) => {
      if (check(page, i, update)) count++;
    });

    if (count === total) res1 += u.at(Math.trunc(total / 2));
    else {
      u.sort((a, b) => {
        const after = rules.filter(r => r[0] === a).map(e => e[1]);
        const before = rules.filter(r => r[1] === a).map(e => e[0]);
        if (after.find(n => n === b)) return 1;
        if (before.find(n => n === b)) return -1;
        if (a === b) return 0;
      });
      res2 += u.at(Math.trunc(total / 2));
    }
  });
};
export { getResults, res1, res2 };
