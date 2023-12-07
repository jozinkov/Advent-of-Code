let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');

  let handBid = new Map();
  data.forEach(d => {
    const [hand, bid] = d.split(' ');
    handBid.set(hand, bid);
  });
  // card strength
  let st = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

  let handRank = new Map();
  let typeMap = new Map([
    [7, ''],
    [6, ''],
    [5, ''],
    [4, ''],
    [3, ''],
    [2, ''],
    [1, ''],
  ]);
  let typeMap2 = new Map(typeMap);

  const findtype = function (hand) {
    const vals = new Set(hand);
    const diff = vals.size;
    const arr = [...vals].map(v => hand.filter(c => c === v).length);

    if (diff === 1) return 7;
    else if (diff === 2 && Math.max(...arr) === 4) return 6;
    else if (diff === 2 && Math.max(...arr) === 3) return 5;
    else if (diff === 3 && Math.max(...arr) === 3) return 4;
    else if (diff === 3 && Math.max(...arr) === 2) return 3;
    else if (diff === 4) return 2;
    else if (diff === 5) return 1;
  };

  const winnings = function (tMap, joker = false) {
    handRank.clear();
    let newC = undefined;
    handBid.forEach((_, k) => {
      let card = k.split('');

      if (joker && card.includes('J')) {
        const num = card.filter(c => c === 'J').length;
        const t = findtype(card);
        const ins = card.map(c => st.indexOf(c));
        let high = Math.max(...ins);

        if (t === 4 && num === 1)
          high = ins.find(i => ins.filter(d => d === i).length === 3);
        else if (t === 3)
          high = Math.max(
            ...ins.filter(i => ins.filter(d => d === i).length === 2 && i !== 0)
          );
        else if (t === 2 && num === 2)
          high = Math.max(
            ...ins.filter(i => ins.filter(d => d === i).length !== 2)
          );
        else if (t === 2 && num === 1)
          high = ins.find(i => ins.filter(d => d === i).length === 2);

        if (t === 7) newC = card;
        else newC = ins.map(h => (h === 0 ? high : h)).map(c => st[c]);
      }
      const type =
        joker && card.includes('J') ? findtype(newC) : findtype(card);
      tMap.set(type, tMap.get(type) + '-' + k);
    });

    let rank = handBid.size;
    tMap.forEach(t => {
      const arr = t.slice(1).split('-');
      if (t === '') return;
      else if (arr.length === 1) handRank.set(arr[0], rank--);
      else {
        arr.sort((a, b) => {
          let result = 0;
          const first = a.split('');
          const second = b.split('');
          for (let i = 0; i < first.length; i++) {
            if (st.indexOf(first[i]) === st.indexOf(second[i])) continue;
            else {
              result = st.indexOf(first[i]) > st.indexOf(second[i]) ? -1 : 1;
              break;
            }
          }
          return result;
        });
        arr.forEach(h => handRank.set(h, rank--));
      }
    });
    let final = 0;
    handBid.forEach((v, k) => (final += v * handRank.get(k)));
    return final;
  };
  res1 = winnings(typeMap);

  ////////////////////////////////////////
  // card strength
  st = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
  res2 = winnings(typeMap2, true);
};
export { getResults, res1, res2 };
