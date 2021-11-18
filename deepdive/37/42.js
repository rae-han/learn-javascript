const rae = { text: 'rae' };
const han = { text: 'han' };

const map = new Map([[rae, 'developer'], [han, 'engineer']]);

map.forEach((v, k, map) => console.log(v, k, map, this));
/*
developer { text: 'rae' } Map(2) {{ text: 'rae' } => 'developer', { text: 'han' } => 'engineer'} {}
engineer { text: 'han' } Map(2) {{ text: 'rae' } => 'developer', { text: 'han' } => 'engineer'} {}
*/

map.forEach((v, k) => console.log(v, k, this), { thisArgs: 'args' });
/*
developer { text: 'rae' } {}
engineer { text: 'han' } {}
*/

map.forEach(function(v, k) { console.log(v, k, this) }, { thisArgs: 'args' });
/*
developer { text: 'rae' } { thisArgs: 'args' }
engineer { text: 'han' } { thisArgs: 'args' }
*/
map.forEach(function(v, k) { console.log(v, k, this) });
/* Server
developer { text: 'rae' } <ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
} ...
*/
/* Client
developer {text: 'rae'} Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …}
...
*/