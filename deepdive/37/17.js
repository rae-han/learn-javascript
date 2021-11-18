const set = new Set([1, 2, 3]);

console.log(Symbol.iterator in set) // true

for (const value of set) {
  console.log(value); // 1 2 3 
}

console.log([...set]); // [ 1, 2, 3 ]

const [...rest] = set;
console.log(rest); // [ 1, 2, 3 ]