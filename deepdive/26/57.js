// let sum = (x, y) => {
//   return x + y;
// }

// console.log(sum(1)); // NaN

// let sum = (x, y) => {
//   x = x || 0;
//   y = y || 0;

//   return x + y;
// }

// console.log(sum(1)); // 1

// let sum = (x = 0, y = 0) => {
//   return x + y;
// }

// console.log(sum(1)); // 1
// console.log(sum(1, 2)); // 3

let showName = (name = 'Raehan') => {
  return name;
}

console.log(showName()); // Raehan
console.log(showName(undefined)); // Raehan
console.log(showName(null)); // null
console.log(showName('Hanrae')); // Hanrae