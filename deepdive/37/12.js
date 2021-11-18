const set = new Set([1, 2, 3]);

console.log(set.delete(2)); // true
console.log(set); // Set(2) { 1, 3 }

console.log(set.delete(0)); // false
console.log(set); // Set(2) { 1, 3 }