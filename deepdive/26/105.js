let objectA = {
  a: 1
};
let objectB = {
  b: 2
};

let objectC = { ...objectA, ...objectB };
console.log(objectC); // { a: 1, b: 2 }

let objectD = { ...{ a: 1}, ...{ b: 2} }; // { a: 1, b: 2 }
console.log(objectD)

console.log(...objectA) // TypeError: Found non-callable @@iterator
