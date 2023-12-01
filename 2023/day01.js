let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  const arr = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  const calibration = function (regex, letters = false) {
    return data.reduce((acc, line) => {
      const nums = line.match(regex);
      if (letters)
        nums.forEach(
          (n, i) => (nums[i] = n.length > 1 ? `${arr.indexOf(n) + 1}` : n)
        );
      return (acc += Number(nums[0] + nums[nums.length - 1]));
    }, 0);
  };
  res1 = calibration(/\d/g);
  res2 = calibration(/one|two|three|four|five|six|seven|eight|nine|\d/g, true);
};
export { getResults, res1, res2 };
