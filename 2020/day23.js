let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  // const dataset = '614752839';
  const dataset = '389125467';

  // let milion = [];
  // for (let n = 10; n <= 1000000; n++) milion.push(n);

  // let cups1 = dataset.split('').map(n => +n);
  // let cups2 = cups1.concat(milion);

  // const dataLength1 = cups1.length;
  // const dataLength2 = cups1.concat(milion).length;

  const game = function (dataLength, cups, moves) {
    let max = Math.max(...cups);
    let current = 0;
    let pickUp, destination, currentCup, newCup;

    for (let i = 1; i <= moves; i++) {
      if (i % 100000 === 0) console.log(i);
      currentCup = cups[current];
      // pick up 3 cups immediately clockwise of the current cup
      if (current < dataLength - 3) pickUp = cups.splice(current + 1, 3);
      else if (current === dataLength - 3)
        pickUp = cups.splice(current + 1, 2).concat(cups.splice(0, 1));
      else if (current === dataLength - 2)
        pickUp = cups.splice(current + 1, 1).concat(cups.splice(0, 2));
      else if (current === dataLength - 1) pickUp = cups.splice(0, 3);
      // select destination cup -> current minus one
      // if it's picked up, keep subtracting one / if below the lowest value select the highest value
      const newMax = Math.max(...cups);
      const newMin = Math.min(...cups);
      if (cups.includes(currentCup - 1)) destination = currentCup - 1;
      else if (pickUp.includes(currentCup - 1)) {
        for (let x = 2; x < max; x++) {
          if (cups.includes(currentCup - x)) {
            destination = currentCup - x;
            break;
          }
          if (currentCup - x < newMin) {
            destination = newMax;
            break;
          }
        }
      } else if (currentCup === newMin) destination = newMax;
      if (cups.indexOf(currentCup) < cups.length - 1)
        newCup = cups[current + 1];
      else newCup = cups[0];
      // place picked up cups after the destination cup
      cups.splice(cups.indexOf(destination) + 1, 0, ...pickUp);
      // select new current cup -> immediately clockwise of the current cup
      current = cups.indexOf(newCup);
    }
    return cups;
  };

  // const result1 = game(dataLength1, cups1, 100);
  // console.log(result1);
  // res1 = result1
  //   .slice(result1.indexOf(1))
  //   .concat(result1.slice(0, result1.indexOf(1)))
  //   .slice(1)
  //   .join('');

  // const result2 = game(dataLength2, cups2, 10000000);
  // console.log(result2);

  ////////////////////////////////////////
  ////////////////////////////////////////

  // class Cup {
  //   constructor(data) {
  //     this.data = data;
  //     this.next = null;
  //   }
  // }

  // class LinkedList {
  //   constructor(head = null) {
  //     this.head = head;
  //     this.current = null;
  //     this.destination = null;
  //     this.size = 0;
  //   }

  //   setCurrent(node) {
  //     this.current = node;
  //   }

  //   addNode(data) {
  //     const newNode = new Cup(data);
  //     let node = this.head;
  //     if (node === null) {
  //       this.head = newNode;
  //       this.size++;
  //       return;
  //     }
  //     while (node.next) {
  //       node = node.next;
  //     }
  //     node.next = newNode;
  //     this.size++;
  //   }

  //   insertAt(i, data) {
  //     let newNode = new Cup(data);
  //     let node = this.head;
  //     if (i === 0) {
  //       newNode.next = node;
  //       this.head = newNode;
  //       this.size++;
  //       return;
  //     }
  //     while (--i) {
  //       if (node.next !== null) node = node.next;
  //       else console.error('Error: Index out of range!');
  //     }
  //     const temp = node.next;
  //     node.next = newNode;
  //     newNode.next = temp;
  //     this.size++;
  //   }

  // printList() {
  //   let node = this.head;
  //   let list = '';
  //   while (node) {
  //     list += ` ${node.data} ->`;
  //     node = node.next;
  //   }
  //   console.log(list.slice(0, list.length - 2));
  // }
  // }

  // initilize list of cups
  // let myCups = new LinkedList();
  // data.forEach(d => myCups.addNode(d));
  // for (let n = 10; n <= 1000000; n++) myCups.addNode(n);
  // myCups.setCurrent(myCups.head);
  // console.log(myCups.current);

  const range = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  };

  const crabcups = (labels, moves = 100, cupcount = 9) => {
    debugger;
    //next will store the next cup, it will also be filled such that next[i] = i+1;
    let next = range(1, cupcount + 1);
    //cups[] stores each cup value
    let cups = labels.split('').map(i => i * 1);
    next[0] = next[next.length - 1] = cups[0];
    for (let x = 0; x < cups.length - 1; x++) {
      //here the cup value is used as the index, it points to the cup next to the current cup
      next[cups[x]] = cups[x + 1];
    }
    //since our next array is filled with 1->cupcount the last value we care to set is the last
    //cups next value, which will be 1+the max of cups
    next[cups[cups.length - 1]] = Math.max(...cups) + 1;
    let cur = 0;

    for (let c = 0; c <= moves; c++) {
      //this is defined abouve as the first cup, next[0] = cups[0]
      cur = next[cur];
      let ins = cur !== 1 ? cur - 1 : cupcount;
      let p1 = next[cur];
      let p2 = next[p1];
      let p3 = next[p2];

      while (ins === p1 || ins === p2 || ins === p3) {
        ins -= 1;
      }
      if (ins < 1) {
        ins += cupcount;
      }

      [next[p3], next[ins], next[cur]] = [next[ins], next[cur], next[p3]];
    }
    return next[1] * next[next[1]];
  };

  console.log(crabcups(dataset, 10000000, 1000000));
};
export { getResults, res1, res2 };
