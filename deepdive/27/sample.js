// console.log(new Array() == [])

let str = new Array('abcdefg');
let num = new Array([1, 2, 3, 4]);
console.log(str);
console.log(num);

const withoutNew = Array(1, 2, 3);
console.log(withoutNew);

const constructorFunc = new Array(4);
console.log(constructorFunc);

const ofKeyword = Array.of(4);
console.log(ofKeyword);

// new와 of의 차이

const sample1 = [1, , 2, ];
console.log(sample1, sample1.length);
console.log(sample1[1]);

const sample2 = Array.from({ length: 4, 0: 1, 2: 2 })
console.log(sample2)

sample1.forEach((v, i) => console.log(`index: ${i} - value: ${v}`));
sample2.forEach((v, i) => console.log(`index: ${i} - value: ${v}`));

// empty와 undefined의 차이
// https://joooing.tistory.com/entry/undefined-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EA%B8%B0-1-undefined-empty-%F0%9F%A7%90

const constructorFuncArray = new Array('Hello');
const fromKeywordArray = Array.from('Hello');

console.log(constructorFuncArray, fromKeywordArray);

const arrayLike = {
  0: 100,
  1: 200,
  2: 300,
  length: 3,
};

for(let i=0; i<arrayLike.length; i++) {
  console.log(arrayLike[i]);
}

console.log(new Array(1, 2).__proto__ === Array.prototype) // true
console.log(arrayLike.__proto__ === Array.prototype); // false
console.log(Array.isArray(arrayLike)); // false
console.log(arrayLike.__proto__ === Object.prototype); // true
// 유사 배열 객체는 Array를 상속 받지 않고 Object를 상속 받기 때문에 Array 메서드를 사용할 수 없다.


console.log('call');
Array.prototype.forEach.call(arrayLike, v => console.log(v));
console.log('apply');
Array.prototype.forEach.apply(arrayLike, [v=>console.log(v)]);
console.log('bind');
Array.prototype.forEach.bind(arrayLike, v => console.log(v))();

console.log('from');
Array.from(arrayLike).forEach(v => console.log(v));

const fromArray1 = Array.from({ length: 3}, (v, i) => `${i}: ${v}`);
const fromArray2 = Array.from(new Array(3), (v, i) => `${i}: ${v}`);
const fromArray3 = Array.from({ length: 2, 0: 'a', 1: 'b'}, v => v.toUpperCase());
console.log(fromArray1, fromArray2, fromArray3);

const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const res1 = range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1);
console.log(res1);
const res2 = range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x));
console.log(res2)

const arr1 = [1, 2, ,4];
console.log(arr1[1]); // 2
console.log(arr1[2]); // undefined

/*
1. 사용자가 '명시적'으로 지정하는 경우
2. Javascript 엔진이 반환하는 경우
  2-1. 값이 할당되지 않은 변수에 접근할 때
  2-2. 존재하지 않는 속성(property)에 접근할 때
  2-3. 함수에 return문이 없을 때, 호출되지 않는 함수를 실행할 때
*/

const arr2 = [1, 2];
console.log(arr2.length); // 2
arr2[100] = 1;
console.log(arr2.length); // 101
console.log(arr2) // [ 1, 2, <98 empty items>, 1 ]

arr2['a'] = 'a';
arr2[-1] = '-1';

console.log(arr2);
console.log(arr2.length);
console.log(Object.getOwnPropertyDescriptors(arr2));

for(const [key, value] of Object.entries(arr2)) {
  console.log(`key: ${key}, value: ${value}`);
}

for(const [key, value] of arr2.entries()) {
  // console.log(`key: ${key}, value: ${value}`);
}
