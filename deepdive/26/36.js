this.num = 5;
// window.num = 5 // O
// global.num = 5 // X

const counter = {
  num: 1,
  increase: () => ++this.num
};

console.log(counter.increase()); // 6