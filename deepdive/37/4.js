const set = new Set([1, 2, 3]);
console.log(Object.getOwnPropertyDescriptor(set.__proto__, 'size'));
console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
/* 
{
  get: [Function: get size],
  set: undefined,
  enumerable: false,
  configurable: true
}
*/

set.size = 10;
console.log(set.size); // 3