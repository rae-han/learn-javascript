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



