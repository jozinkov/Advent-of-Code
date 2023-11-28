let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData.split('\n').filter(d => d != '');

  const addParentheses1 = function (s) {
    s = s
      .split(' ')
      .reduce(
        (acc, ch, i) => (acc += /\d/.test(ch) && i !== 0 ? `${ch})` : ch),
        ''
      );
    s = s.padStart(s.length + [...s.matchAll(/\+|\*/g)].length, '(');
    return s;
  };

  const addParentheses2 = function (s) {
    const adds = [...s.matchAll(/\d(?:\s|\d|\+)*\d/g)]
      .flat(1)
      .map(e => eval(e));
    s = s
      .split(/\d(?:\s|\d|\+)*\d/)
      .reduce((acc, cur, i) => (acc += cur + adds[i]), '')
      .replaceAll('undefined', '');
    return s;
  };

  const evaluateExpression = function (str, task) {
    // evaluate 1st level of parentheses
    const firstStep = [...str.matchAll(/\((?:\s|\d|\+|\*)*\)/g)]
      .flat(1)
      .map(e => {
        e = e.slice(1, -1);
        if (e.length === 5) return eval(e);
        else {
          if (task === 1) e = addParentheses1(e);
          if (task === 2) e = addParentheses2(e);
          return eval(e);
        }
      });
    // add 1st level results to the string
    const secondStep = str
      .split(/\((?:\s|\d|\+|\*)*\)/)
      .reduce((acc, cur, i) => (acc += cur + firstStep[i]), '')
      .replaceAll('undefined', '');

    // check for next level of parentheses and evaluate again
    if (secondStep.includes('(')) evaluateExpression(secondStep, task);
    else {
      if (task === 1) res1 += eval(addParentheses1(secondStep));
      if (task === 2) res2 += eval(addParentheses2(secondStep));
    }
  };

  dataset.forEach(el => evaluateExpression(el, 1));
  dataset.forEach(el => evaluateExpression(el, 2));
};
export { getResults, res1, res2 };
