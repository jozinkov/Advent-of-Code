let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData
    .split('\n\n')
    .filter(d => d !== '')
    .map(d => d.split('\n'));

  const rotate = function (data) {
    const rotated = Array(data[0].length).fill('');
    data.forEach(r => {
      r.split('').forEach((d, i) => (rotated[i] += d));
    });
    return rotated.map(r => r.split('').reverse().join(''));
  };

  const mirrors = function (d) {
    // number of remaining rows until an edge
    let number;
    // START - line of reflection
    let start;
    // final pattern
    let final;
    // columns
    let cols = false;

    // check if pattern has 2 same rows next to each other
    const findLine = p => p.findIndex((l, i, a) => a[i + 1] === l);

    const findNexts = function (p, stIn) {
      // next row -> line of reflection (2 rows) + 1
      let next = 3;
      let index;
      // check if the rest of rows reflect each other until the end
      for (let i = stIn - 1; i >= 0; i--) {
        if (p[i] === p[i + next]) {
          next += 2;
          index = i;
        } else break;
      }

      if (
        index === 0 ||
        stIn + 1 + (stIn - index) === p.length - 1 ||
        stIn - 1 < 0 ||
        stIn + 1 === p.length - 1
      )
        return true;
      else return false;
    };

    const findPattern = function (first, arr) {
      final = findNexts(arr, first);
      number = first + 1;
    };

    const checkFinal = function (arr, prev) {
      // check again for other line of reflection
      start = arr.findIndex((l, i, a) => a[i + 1] === l && i > prev);
      if (start !== -1) findPattern(start, arr);
    };

    start = findLine(d);

    // line of reflection found
    if (start !== -1) findPattern(start, d);
    // pattern does not end with edge
    if (start !== -1 && !final) checkFinal(d, start);
    // NO line of reflection or correct end -> check columns
    if (start === -1 || !final) {
      // if pattern is not in rows, rotate and check again for columns
      start = undefined;
      const rotated = rotate(d);
      start = findLine(rotated);

      if (start !== -1) findPattern(start, rotated);
      if (start !== -1 && !final) checkFinal(rotated, start);

      cols = true;
    }

    // result count
    if (start !== -1 && final) {
      if (cols) res1 += number;
      else res1 += number * 100;
    }
  };

  data.forEach(d => mirrors(d));

  // SMUDGE
  const mirrors2 = function (d) {
    // number of remaining rows until an edge
    let number;
    // START - line of reflection
    let start;
    // final pattern
    let final;
    // columns
    let cols = false;

    // check if pattern has 2 same rows next to each other
    const findLine = p => p.findIndex((l, i, a) => a[i + 1] === l);

    const findNexts = function (p, stIn) {
      // next row -> line of reflection (2 rows) + 1
      let next = 3;
      let index;
      // check if the rest of rows reflect each other until the end
      for (let i = stIn - 1; i >= 0; i--) {
        if (p[i] === p[i + next]) {
          next += 2;
          index = i;
        } else break;
      }

      if (
        index === 0 ||
        stIn + 1 + (stIn - index) === p.length - 1 ||
        stIn - 1 < 0 ||
        stIn + 1 === p.length - 1
      )
        return true;
      else return false;
    };

    const findPattern = function (first, arr) {
      final = findNexts(arr, first);
      number = first + 1;
    };

    const checkFinal = function (arr, prev) {
      // check again for other line of reflection
      start = arr.findIndex((l, i, a) => a[i + 1] === l && i > prev);
      if (start !== -1) findPattern(start, arr);
    };

    const findSmudge = function (line1, line2) {
      const line2a = line2.split('');
      const num = line1.split('').filter((v, i) => line2a[i] !== v);
      if (num.length === 1) return true;
      else return false;
    };

    // find possible smudges - lines of reflection
    let smudges = [];
    for (let i = 0; i < d.length - 1; i++) {
      if (findSmudge(d[i], d[i + 1])) smudges.push(i);
    }
    // for each smudge find if it has final pattern
    if (smudges.length) {
      smudges.forEach(sm => {
        if (main(sm)) return;
      });
    }

    // line of reflection found
    if (start !== -1) findPattern(start, d);
    // pattern does not end with edge
    if (start !== -1 && !final) checkFinal(d, start);
    // NO line of reflection or correct end -> check columns
    if (start === -1 || !final) {
      // if pattern is not in rows, rotate and check again for columns
      start = undefined;
      const rotated = rotate(d);
      start = findLine(rotated);

      if (start !== -1) findPattern(start, rotated);
      if (start !== -1 && !final) checkFinal(rotated, start);

      cols = true;
    }

    // result count
    if (start !== -1 && final) {
      if (cols) res2 += number;
      else res2 += number * 100;
    }
  };

  //   data.forEach(d => mirrors2(d, true));
};
export { getResults, res1, res2 };
