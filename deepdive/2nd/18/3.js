function square (number) {
  return number * number;
}

console.log(Object.getOwnPropertyDescriptors(square))
// {
//   length: { value: 1, writable: false, enumerable: false, configurable: true },
//   name: {
//     value: 'square',
//       writable: false,
//       enumerable: false,
//       configurable: true
//   },
//   arguments: {
//     value: null,
//       writable: false,
//       enumerable: false,
//       configurable: false
//   },
//   caller: {
//     value: null,
//       writable: false,
//       enumerable: false,
//       configurable: false
//   },
//   prototype: { value: {}, writable: true, enumerable: false, configurable: false }
// }

console.log(Object.getOwnPropertyDescriptor(square, '__proto__'));
// undefined

console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {
//   get: [Function: get __proto__],
//   set: [Function: set __proto__],
//   enumerable: false,
//     configurable: true
// }

console.log(square.__proto__ === Function.prototype)
console.log(square.prototype.__proto__ === Object.prototype)