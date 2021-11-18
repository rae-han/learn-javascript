const rae = { text: 'rae' };
const han = { text: 'han' };

const map = new Map([[rae, 'developer'], [han, 'engineer']]);

for(const key of map.keys()) {
  console.log(key); 
  // { text: 'rae' }
  // { text: 'han' }
};

for(const value of map.values()) {
  console.log(value);
  // developer
  // engineer
};

for(const entry of map.entries()) {
  console.log(entry);
  // [ { text: 'rae' }, 'developer' ]
  // [ { text: 'han' }, 'engineer' ]
};

for(const [key, value] of map.entries()) {
  console.log(key, value);
  // { text: 'rae' } developer
  // { text: 'han' } engineer
};