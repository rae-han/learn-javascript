let map = new Map();
map.set('name', 'raehan');

let values = map.values();
console.log(values);
values = [...values]
values.push('newValue');

console.log(values);

// 어떻게 동작 할까요?
// 문제가 있다면 왜 그렇고 어떤 부분을 수정해야 할까요??
