let value1 = 1;
let value2 = 1;
const value3 = 1;
const value4 = 1;

console.log(value1 === value2); // true
console.log(value1 === value3); // true

const symbol1 = Symbol('mySymbol');
const symbol2 = Symbol('mySymbol');

console.log(symbol1 === symbol2);

let user = {
  name: 'raehan',
  id: 1,
}

let id = Symbol("id");

user[id] = 1;

console.log(user)

console.log(user.id);
console.log(user.symbol("id"))
