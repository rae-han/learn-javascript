const name = Symbol('name');
const user = {
  name: 'raehan',
  [name]: 'jeong', // 리터럴 일땐 대괄호로 심볼 값 추가
  id: 1,
}

const id = Symbol('id');
user[id] = 2;
console.log(user); // { name: 'raehan', id: 1, [Symbol(name)]: 'jeong', [Symbol(id)]: 2 }