const rae = { text: 'rae' };
const han = { text: 'han' };

const map = new Map([[rae, 'developer'], [han, 'engineer']]);

console.log(Symbol.iterator in map); // true

for (const entry of map) {
  console.log(entry);
  /*
  [ { text: 'rae' }, 'developer' ]
  [ { text: 'han' }, 'engineer' ]
  */
}

console.log([...map]); // [ [ { text: 'rae' }, 'developer' ], [ { text: 'han' }, 'engineer' ] ]

const [a, b] = map;
console.log(a, b); // [ { text: 'rae' }, 'developer' ] [ { text: 'han' }, 'engineer' ]


