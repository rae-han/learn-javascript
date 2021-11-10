// let hello = "Hello";
// let world = "World";

// let helloWorld = [...hello, '', ...world];
// console.log(helloWorld);

// const myGenerator = {};

// myGenerator[Symbol.iterator] = function* () {
//   yield 1;
//   yield 2;
//   yield 3;
// };

// console.log([...myGenerator]);

// let helloIterator = hello[Symbol.iterator]();
// console.log(helloIterator.next());


// const key = () => {}
// const obj1 = {
//   [key]() {
//     return {
//       next() {
//         return 1;
//       }
//     }
//   }
// }

// console.log(obj1);

// // 이터러블인지 확인하는 함수
// const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

// console.log(isIterable([])); // true
// console.log(isIterable('')); // true
// console.log(isIterable(new Array())); // true
// console.log(isIterable(new String())); // true
// console.log(isIterable(new Map())); // true
// console.log(isIterable(new Set())); // true
// console.log(isIterable({})); // false

const array1 = [1, 2, 3];

// const obj2 = {
//   'key': 'value',
//   // [Symbol.iterator]() { }
// }

// console.log(`#### #### #### ####`)
// console.log(Symbol.iterator in array1); // true
// console.log(Symbol.iterator in obj2); // false
// console.log('key' in obj2); // true

// for (const item of array1) {
//   console.log(item);
// }
// // 1
// // 2
// // 3

const array2 = [, 4, 5, 6];

console.log([...array1, ...array2])
// let [a, ...rest] = [...array1, ...array2];
// console.log(a, rest)

// const obj = { a: 1, b: 2 };

// console.log(Symbol.iterator in obj); // false

// // for (const item of obj) { // TypeError: obj is not iterable
// //   console.log(item);
// // }

// // const [a, b] = obj; // TypeError: obj is not iterable

// console.log({ ...obj }); // { a: 1, b: 2 }
