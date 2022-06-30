const s1 = Symbol.for('forSymbol');
const s2 = Symbol.for('forSymbol');

console.log(s1 === s2);
console.log(s1);

console.log(Symbol.keyFor(s1));