const set1 = new Set();
console.log(set1); // Set(0) {}

const set2 = new Set([1, 2, 3, 4]);
const set3 = new Set('Hello');
// const set4 = new Set(1234); // TypeError: number 1234 is not iterable (cannot read property Symbol(Symbol.iterator))
console.log(set2); // Set(4) { 1, 2, 3, 4 }
console.log(set3); // Set(4) { 'H', 'e', 'l', 'o' }

const set4 = new Set([1, 2, 3, 1, 2, 4, 6, 8, 1]);
console.log(set4); // Set(6) { 1, 2, 3, 4, 6, 8 }