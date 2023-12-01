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
      if (letters) {
        let last = undefined;
        line.split('').forEach((d, i) => {
          if (/\d/.test(d)) last = d;
          else if (/[a-z]/.test(d)) {
            if (d == 'o' && line[i + 1] == 'n' && line[i + 2] == 'e')
              last = 'one';
            if (d == 't' && line[i + 1] == 'w' && line[i + 2] == 'o')
              last = 'two';
            if (
              d == 't' &&
              line[i + 1] == 'h' &&
              line[i + 2] == 'r' &&
              line[i + 3] == 'e' &&
              line[i + 4] == 'e'
            )
              last = 'three';
            if (
              d == 'f' &&
              line[i + 1] == 'o' &&
              line[i + 2] == 'u' &&
              line[i + 3] == 'r'
            )
              last = 'four';
            if (
              d == 'f' &&
              line[i + 1] == 'i' &&
              line[i + 2] == 'v' &&
              line[i + 3] == 'e'
            )
              last = 'five';
            if (d == 's' && line[i + 1] == 'i' && line[i + 2] == 'x')
              last = 'six';
            if (
              d == 's' &&
              line[i + 1] == 'e' &&
              line[i + 2] == 'v' &&
              line[i + 3] == 'e' &&
              line[i + 4] == 'n'
            )
              last = 'seven';
            if (
              d == 'e' &&
              line[i + 1] == 'i' &&
              line[i + 2] == 'g' &&
              line[i + 3] == 'h' &&
              line[i + 4] == 't'
            )
              last = 'eight';
            if (
              d == 'n' &&
              line[i + 1] == 'i' &&
              line[i + 2] == 'n' &&
              line[i + 3] == 'e'
            )
              last = 'nine';
          }
        });
        nums.push(last);
        nums.forEach(
          (n, i) => (nums[i] = n.length > 1 ? `${arr.indexOf(n) + 1}` : n)
        );
      }
      return (acc += Number(nums[0] + nums[nums.length - 1]));
    }, 0);
  };
  res1 = calibration(/\d/g);
  res2 = calibration(/one|two|three|four|five|six|seven|eight|nine|\d/g, true);
};
export { getResults, res1, res2 };
