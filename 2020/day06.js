let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData
    .split('\n\n')
    .map(d => d.replaceAll('\n', ' ').trim());
  let groupYesQsCount = [];
  let sameYes = [];

  const count = function (arr) {
    return arr.reduce((acc, cur) => acc + cur, 0);
  };

  dataset.forEach(g => {
    const allAnswers = g.replaceAll(' ', '').split('');
    const yesQestions = new Set(allAnswers);
    groupYesQsCount.push(yesQestions.size);

    let sum = 0;
    const people = g.split(' ').length;
    const allYes = allAnswers.reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
      new Map()
    );
    [...allYes.values()].forEach(n => {
      if (n === people) sum++;
    });
    sameYes.push(sum);
  });

  res1 = count(groupYesQsCount);
  res2 = count(sameYes);
};
export { getResults, res1, res2 };
