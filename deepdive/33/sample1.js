let value1 = 1;
let value2 = 1;
const value3 = 1;
const value4 = 1;

console.log(value1 === value2); // true
console.log(value1 === value3); // true

const symbol1 = Symbol('mySymbol');
const symbol2 = Symbol('mySymbol');

console.log(symbol1 === symbol2);

// let user = {
//   name: 'raehan',
//   // id: 1,
// }

// let id = Symbol("id");

// user[id] = 1;

// console.log(user)

// console.log(user.id);
// console.log(user.symbol("id"))


// const statusList = ['PENDING', 'SUCCESS', 'RUNNING'];

// export const apiStatus = statusList.reduce((acc, key) => {
//   acc[[key]] = Symbol(key);
//   return acc;
// }, {});

// let symbolUser = {
//   name: 'reahan',
//   id: 1,
//   [id]: 2
// }

// console.log(symbolUser)

const name = Symbol('name');
const user = {
  name: 'raehan',
  [name]: 'jeong', // 리터럴 일땐 대괄호로 심볼 값 추가
  id: 1,
}
const id = Symbol('id');

user[id] = 2;
console.log(user)