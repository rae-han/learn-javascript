const map = new Map([['k1', 'v1'], ['k2', 'v2']]);

console.log(map.size); // 2

console.log(Object.getOwnPropertyDescriptor(map.__proto__, 'size'));
// === console.log(Object.getOwnPropertyDescriptor(Map.prototype, 'size'));
/* 
{
  get: [Function: get size],
  set: undefined,
  enumerable: false,
  configurable: true
}
*/
map.size = 10;
console.log(map.size); // 2