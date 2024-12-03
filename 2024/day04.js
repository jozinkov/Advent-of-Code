let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  const data = fileData.split('\n').filter(d => d !== '');
  console.log(data);
};
export { getResults, res1, res2 };
