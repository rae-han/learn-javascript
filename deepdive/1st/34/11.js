const arrayLike = {
  0: 1,
  1: 2,
  length: 3
};

const iterator = Array.from(arrayLike)[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
