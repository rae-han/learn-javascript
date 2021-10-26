const arr = [1, 2, 2, 3];

const log = () => console.log(arr)

console.log(arr.indexOf(2));
console.log(arr.includes(2));

console.log(arr.push(4));
// 위 보다 length 를 사용해서 직접 추가하는게 속도가 더 빠르다.
arr[arr.length] = 5;
log();
const newArr1 = [...arr, 6, 7];
console.log(newArr1);

console.log(arr.pop());
log();

console.log(arr.unshift(1));
log();

const newArr2 = [0, 1, ...arr];
console.log(newArr2);

console.log(arr.shift());
log();

let result1 = arr.concat(arr);
console.log(result1)
let result2 = arr.concat(123);
console.log(result2);

arr.unshift(0);
console.log([0].concat(arr));

arr.push(4);
console.log(arr.concat(4));

console.log([...[1, 2], ...[3, 4]]); // 가장 추천

console.log(arr.splice(1, 2, 1, 3, 3));
log();

console.log(arr.splice(arr.indexOf(3), 1));
log();

let result3 = arr.filter(v => v !== 3);
console.log(result3);

let result4 = arr.slice(1);
let result5 = arr.slice(1, 3); // 첫번째 인수 인덱스부터 두번째 인수 인덱스 전까지.

console.log(result4, result5)

console.log(arr.slice(-8))
console.log(arr.slice(-1000))

let arr2 = [[1, 2], [[3, 4], [5, 6]], 7];
let result6 = arr2.slice();
result6[1][0][1] = 8;
result6[2] = 9;
console.log(result6);
console.log(arr2);

function sum() { // 화사룦 함수 x
  const args = Array.from(arguments);
  
  return args.reduce((pre, cur) => pre+cur, 0);
}

console.log(sum(1, 2, 3));

const sequences = (length) => Array.from({ length }, (v, i) => i);
console.log(sequences(4));

console.log(arr.includes(1));
console.log(arr.includes(100));

console.log([1].indexOf(1));
console.log([1].includes(1));
console.log([NaN].indexOf(NaN));
console.log([NaN].includes(NaN));

const sArr = ['apple', 'banana', 'orange', 'melon', 'Lemon', 'peach', 'tomato', 1, 2, 12];

console.log(sArr.sort());
console.log(sArr.reverse());

const todos = [
  { id: 4, content: 'JavaScript' },
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' }
];

todos.sort((a, b) => a.id - b.id);
console.log(todos)

console.log(arr.map(v => v**2));