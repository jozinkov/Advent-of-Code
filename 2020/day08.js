let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const dataset = fileData.split('\n').filter(n => n != '');

  let acc = 0;
  let is = [];
  const findLoop = function (data, index) {
    const cmd = data[index];
    if (cmd) {
      const command = cmd.slice(0, 3);
      const num = cmd.at(4) === '+' ? +cmd.slice(5) : +cmd.slice(5) * -1;

      if (is.includes(index)) return; // infinite loop
      is.push(index);

      // program
      if (command === 'acc') {
        acc += num;
        findLoop(data, index + 1);
      }
      if (command === 'jmp') findLoop(data, index + num);
      if (command === 'nop') findLoop(data, index + 1);
    } ///////
    else {
      res2 = acc;
      return; // successful end
    }
  };
  findLoop(dataset, 0);
  res1 = acc;

  let sample;
  dataset.forEach((d, i) => {
    if (d.slice(0, 3) !== 'acc') {
      is = [];
      sample = dataset.slice();
      acc = 0;

      if (d.slice(0, 3) === 'jmp') sample[i] = sample[i].replace('jmp', 'nop');
      if (d.slice(0, 3) === 'nop') sample[i] = sample[i].replace('nop', 'jmp');

      findLoop(sample, 0);
    }
  });
};
export { getResults, res1, res2 };
