let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData
    .replaceAll('\n', '')
    .split(' ')
    .filter(d => d !== '')
    .map(n => +n);

  // Each blink - the stones simultaneously change
  //
  // If 0, replace with 1
  // If even number of digits, split into left and right half of the digits (no extra leading zeroes)
  // Else the number is multiplied by 2024

  // 25 BLINKS
  let stones = data;
  for (let i = 1; i <= 75; i++) {
    let blink = [];
    stones.forEach(s => {
      let str = s.toString();
      if (s === 0) blink.push(1);
      else if (str.length % 2 === 0) {
        const half = str.length / 2;
        blink.push(parseInt(str.slice(0, half)));
        blink.push(parseInt(str.slice(half, str.length)));
      } else blink.push(s * 2024);
    });
    stones = blink;
  }
  res1 = stones.length;
};
export { getResults, res1, res2 };
