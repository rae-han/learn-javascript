function* sumGenerator() {
  let x = yield;
  let y = yield;
  yield x + y;
}

const sum = sumGenerator();

console.log(sum.next()); // { value: undefined, done: false }
console.log(sum.next(1)); // { value: undefined, done: false }
console.log(sum.next(2)); // { value: 3, done: false }
console.log(sum.next()); // { value: undefined, done: true }
