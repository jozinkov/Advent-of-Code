let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  //   let [rules, messages] = fileData.replaceAll('"', '').split('\n\n');
  let [rules, messages] =
    '0: 4 1 5\n1: 2 3 | 3 2\n2: 4 4 | 5 5\n3: 4 5 | 5 4\n4: "a"\n5: "b"\n\n\nababbb\nbababa\nabbbab\nnaaabbb\naaaabbb'
      .replaceAll('"', '')
      .split('\n\n');
  const formatData = data => data.split('\n').filter(l => l !== '');

  rules = new Map(formatData(rules).map(r => r.split(': ')));
  messages = formatData(messages);

  class Node {
    constructor(value, left, right) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }

  const chars = new Map();
  rules.forEach((v, k) => /[a-z]/.test(v) && chars.set(k, v));

  let allNodes = new Map();
  rules.forEach((v, k) => {
    if (!chars.has(k)) {
      const [left, right] = v.includes('|') ? v.split(' | ') : v.split(' ');
      allNodes.set(k, new Node(k, left, right));
    }
  });

  console.log(chars, allNodes);

  const validateMessage = function (currentRule, message) {
    const node = allNodes.get(currentRule);

    if (node.left.includes(' ')) {
      const [left, right] = node.left.split(' ');
      validateMessage(left, message);
      validateMessage(right, message);
    } else validateMessage(node.left, message);

    return true;
  };

  messages.forEach(m => validateMessage('0', m) && res1++);
};
export { getResults, res1, res2 };
