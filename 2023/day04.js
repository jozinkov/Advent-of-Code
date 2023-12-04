let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData
    .split('\n')
    .filter(d => d !== '')
    .map(d => d.replace('Card', ''));

  const cardMap = new Map(
    data.map(d => {
      let [card, nums] = d.split(': ');
      card = card.replaceAll(' ', '');
      let [winning, oncard] = nums.split(' | ');
      return [
        card,
        [
          winning.split(' ').filter(n => n !== ''),
          oncard.split(' ').filter(n => n !== ''),
        ],
      ];
    })
  );

  let cardCopies = new Map();
  cardMap.forEach((_, k) => cardCopies.set(k, 1));
  cardMap.forEach((v, k) => {
    let winCount = v[1].filter(n => v[0].indexOf(n) !== -1).length;
    if (winCount !== 0) res1 += Math.pow(2, winCount - 1);

    const instances = cardCopies.get(k);
    for (let i = 0; i < instances; i++) {
      let card = +k;
      let newcard = undefined;
      let count = winCount;
      while (count) {
        newcard = ++card;
        cardCopies.set(
          newcard.toString(),
          cardCopies.get(newcard.toString()) + 1
        );
        count--;
      }
    }
  });
  [...cardCopies.values()].forEach(v => (res2 += v));
};
export { getResults, res1, res2 };
