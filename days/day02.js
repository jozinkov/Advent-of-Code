let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData
    .replaceAll(':', '')
    .split('\n')
    .filter(n => n != '');

  dataset.forEach(rec => {
    const [rule, char, password] = rec.split(' ');
    const [min, max] = rule.split('-').map(n => +n);

    // 1st result
    const re = new RegExp(char, 'g');
    const count = (password.match(re) || []).length;
    if (count >= min && count <= max) res1++;

    // 2nd result
    if (
      (password.at(min - 1) === char && password.at(max - 1) !== char) ||
      (password.at(min - 1) !== char && password.at(max - 1) === char)
    )
      res2++;
  });
};
export { getResults, res1, res2 };
