const getOutput = function (fileData, fileName = 'input??.txt') {
  document.querySelector('.task').innerText = `Day ${fileName.slice(5, 7)}`;

  import(`./2024/day${fileName.match(/\d+/)[0]}.js`).then(Day => {
    Day.getResults(fileData);
    document.querySelector(
      '.result1'
    ).innerHTML = `Task 1: <span class="result--color">${Day.res1}</span>`;
    document.querySelector(
      '.result2'
    ).innerHTML = `Task 2: <span class="result--color">${Day.res2}</span>`;
  });
};

document.querySelector('.input').addEventListener('change', function () {
  const [file] = document.querySelector('input[type=file]').files;
  const reader = new FileReader();
  reader.fileName = file?.name;

  reader.addEventListener(
    'load',
    e => {
      const inputName = e?.target?.fileName;
      getOutput(reader.result, inputName);
    },
    false
  );
  if (file) reader.readAsText(file);
});
