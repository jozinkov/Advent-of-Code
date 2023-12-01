let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = new Map(
    fileData
      .replaceAll('.', '')
      .replaceAll('bags', 'bag')
      .split('\n')
      .filter(n => n != '')
      .map(s => s.split(' contain '))
  );

  let sample = new Map(dataset); // copy for calculation
  let bags = []; // final array of all bags including "shiny gold bag"

  // bags that include "shiny gold bag" DIRECTLY
  sample.forEach((v, k) => {
    if (v.includes('shiny gold bag')) {
      bags.push(k);
      sample.delete(k);
    }
  });
  // all other bags - INDIRECTLY
  const search = function (arr) {
    let check = [];
    sample.forEach((v, k) => {
      arr.forEach(b => {
        if (v.includes(b) && !bags.includes(k)) {
          check.push(k);
          bags.push(k);
          sample.delete(k);
        }
      });
    });
    if (check.length === 0) return;
    else search(check);
  };
  search(bags);

  let count = 0;
  const tree = function (bag, num) {
    dataset
      .get(bag)
      ?.split(', ')
      .forEach(item => {
        if (item != 'no other bag') {
          const add = num * +item.substring(0, item.indexOf(' '));
          count += add;
          tree(item.substring(item.indexOf(' ') + 1), add);
        }
      });
  };
  tree('shiny gold bag', 1);

  res1 = bags.length;
  res2 = count;
};
export { getResults, res1, res2 };
