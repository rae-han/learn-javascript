console.log(new Array()); // []
console.log(new Array(3)); // [ <3 empty items> ]
console.log(new Array(1, 2, 3)); // [ 1, 2, 3 ]
console.log(new Array('3')); // [ '3' ]
console.log(new Array('a')); // [ 'a' ]
console.log(new Array('a', 'b', 'c')); // [ 'a', 'b', 'c' ]
console.log(new Array(undefined)); // [ undefined ]
console.log(new Array({ a: 1 })); // [ { a: 1 } ]
// console.log(new Array(NaN)); // RangeError: Invalid array length
// console.log(new Array(Infinity)); // RangeError: Invalid array length
console.log(new Array(2**32-1).length); // 4294967295
// new Array(2**32); // RangeError: Invalid array length
// new Array(-1); // RangeError: Invalid array length

Array(1, 2, 3);

console.log(new Array(3)); // [ <3 empty items> ]
console.log(Array.of(3)); // [ 3 ]

Array.of2 = function() {
  return Array.prototype.slice.call(arguments);
};

console.log(Array.of2(3)); // [ 3 ]
console.log(Array.of2(1, 3)); // [ 1, 3 ]


const sample1 = Array.from({ length: 4, 0: 1, 2: 2 })
console.log(sample1); // [ 1, undefined, 2, undefined ]

const sample2 = Array.from('Hello');
console.log(sample2) // [ 'H', 'e', 'l', 'l', 'o' ]

console.log(Array.from({ length: 3 })); // [ undefined, undefined, undefined ]
console.log(Array.from({ length: 3 }, (_, idx) => idx)); // [ 0, 1, 2 ]

const fromArray1 = Array.from({ length: 3}, (v, i) => `${i}: ${v}`);
//[ '0: undefined', '1: undefined', '2: undefined' ]

const fromArray2 = Array.from(new Array(1, 2, 3), v => v**2);
//[ '0: undefined', '1: undefined', '2: undefined' ]

const fromArray3 = Array.from({ length: 2, 0: 'a', 1: 'b'}, v => v.toUpperCase());
[ 'A', 'B' ]

console.log(fromArray1, fromArray2, fromArray3);

// console.log(Array.from().length);

const iterableObject = {
  0: 1, 1: 2, 2: 3,
}

const arrayLike = {
  length: 3,
  0: 1, 1: 2, 2: 3,
};

for(let i=0; i<arrayLike.length; i++) {
  console.log(arrayLike[i]);
}

console.log(new Array(1, 2).__proto__ === Array.prototype) // true
console.log(arrayLike.__proto__ === Array.prototype); // false
console.log(Array.isArray(arrayLike)); // false
console.log(arrayLike.__proto__ === Object.prototype); // true

// arrayLike.forEach(v => console.log(v));

console.log('call');
Array.prototype.forEach.call(arrayLike, v => console.log(v));
console.log('apply');
Array.prototype.forEach.apply(arrayLike, [v=>console.log(v)]);
console.log('bind');
Array.prototype.forEach.bind(arrayLike, v => console.log(v))();

// Array.from(arrayLike).forEach(v => console.log(v));

console.log(typeof Array.prototype);

// const arr = [1, 2, , , , 3];

// console.log(arr)
// console.log(arr[1]); // 2
// console.log(arr[10]); // undefined
// console.log(arr[2]); // undefined

// const arr = [0];

// arr[1] = 1;
// arr[10] = 10;

// console.log(arr); // [ 0, 1, <8 empty items>, 10 ]
// console.log(arr.length); // 11

// console.log(Object.getOwnPropertyDescriptors(arr));
/* 
{
  '0': { value: 0, writable: true, enumerable: true, configurable: true },
  '1': { value: 1, writable: true, enumerable: true, configurable: true },
  '10': { value: 10, writable: true, enumerable: true, configurable: true },
  length: { value: 11, writable: true, enumerable: false, configurable: false }
} */


// const arr = [1, 2, , , undefined, 3];

// arr.forEach(v => console.log(v));

// const arr = [];

// arr[0] = 0;
// arr['1'] = 1;

// arr['foo'] = 2;
// arr.bar = 3;
// arr[1.1] = 4;
// arr[-1] = 5

// console.log(arr, arr.length); // [ 0, 1, foo: 2, bar: 3, '1.1': 4, '-1': 5 ], 2
// console.log(Object.getOwnPropertyDescriptors(arr));

// const arr = [1, 2, 3];

// delete arr[1];
// console.log(arr); // [ 1, <1 empty item>, 3 ]
// console.log(arr.length); // 3

// const arr = [1, 2, 3];

// arr.splice(1, 1);
// console.log(arr, arr.length); // [ 1, 3 ], 2

const arr = [1, 2, 2, 3];

arr.indexOf(2);    // 1
arr.indexOf(4);    // -1
arr.indexOf(2, 2); // 2

console.log(arr.includes(2)); // true