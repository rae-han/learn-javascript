function Counter() {
  // 카운트를 유지하기 위한 자유 변수
  let counter = 0;
  // this.counter = 0;

  // 클로저
  this.increase = function () {
    return ++counter;
    // return ++this.counter;
  };

  // 클로저
  this.decrease = function () {
    return --counter;
    // return --this.counter;
  };
}

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.decrease()); // 0
console.dir(counter)