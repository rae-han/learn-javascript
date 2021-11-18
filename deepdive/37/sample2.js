const set = new Set([1, 2]);

const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);

const [setEnt, mapEnt] = [set.entries(), map.entries()];

console.log(setEnt.next(), mapEnt.next()); // { value: [ 1, 1 ], done: false } { value: [ 'key1', 'value1' ], done: false }
console.log(setEnt.next(), mapEnt.next()); // { value: [ 2, 2 ], done: false } { value: [ 'key2', 'value2' ], done: false }
console.log(setEnt.next(), mapEnt.next()); // { value: undefined, done: true } { value: undefined, done: true }

