const fibonacci = {
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const max = 10;

    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { value: cur, done: cur >= max };
        // return { value: cur }; // ... Infinity ...
        // return { done: cur >= max }; // undefined undefined undefined undefined undefined
        // return {}
      }
      // func() { // TypeError: .iterator.next is not a function
      //   [pre, cur] = [cur, pre + cur];
      //   return { value: cur, done: cur >= max };
      // }
    };
  }
};

for (const num of fibonacci) {
  console.log(num); // 1 2 3 5 8
}

fibonacciIterator = fibonacci[Symbol.iterator]();

console.log(fibonacciIterator.next()); // { value: 1, done: false }
console.log(fibonacciIterator.next()); // { value: 2, done: false }
console.log(fibonacciIterator.next()); // { value: 3, done: false }
console.log(fibonacciIterator.next()); // { value: 5, done: false }
console.log(fibonacciIterator.next()); // { value: 8, done: false }
console.log(fibonacciIterator.next()); // { value: 13, done: true }
console.log(fibonacciIterator.next()); // { value: 21, done: true }

console.log([...fibonacci]); // [1, 2, 3, 5, 8];
const [first, second, ...rest] = fibonacci;
console.log(first, second, rest); // 1 2 [ 3, 5, 8 ]