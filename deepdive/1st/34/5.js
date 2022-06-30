const array = [];
const iterator = array[Symbol.iterator]();

console.log('next' in iterator); // true