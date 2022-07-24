const log = console.log;
const div = (title) => console.log(`\n\x1b[34m######## ${title}\x1b[0m`)

const products = [
  {name: '반팔티', price: 15000},
  {name: '긴팔티', price: 20000},
  {name: '핸드폰케이스', price: 15000},
  {name: '후드티', price: 30000},
  {name: '바지', price: 25000}
];

div('1. map')
// # map
// ## befroe
let names = [];
for (const p of products) {
  names.push(p.name);
}
log(names);
// ## after
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};
log(map(p => p.name, products));

// - 함수형 프로그래밍은 외부에 직접적인 변화를 일으키거나 다른 함수를 호출하는 것이 아니라, 전달 받은 인자와 반환 값을 통해 데이터를 다룬다.
// - 데이터 이름을 iter로 명명한 이유는 들어오는 데이터가 이터러블을 따른다는 의미.
// - 위의 코드를 비교하면 기존에는 어떤 값을 수집할 것인지 함수 안에 명시적으로 적었다면(name),
// - 함수형 프로그래밍에서는 추상화를 통해, f라는 함수에게 완전히 위임한다.
// - 즉 map 이라는 고차 함수의 매개변수로 보조 함수(콜백 함수)를 받아, 이터러블 규약을 따르는 어떤 값의 특정 값을 수집하는 식으로 사용한다.

// - 고차 함수는 보조 함수를 자신의 일부분으로 합성하고, 고차 함수는 매개 변수로 받은 보조 함수의 호출 시점을 결정해서 호출한다.
// - 보조 함수는 고차 함수에 의해 호출되며, 이때 고차 함수는 필요에 따라 콜백 함수에 인수를 전달할 수 있다.

div('2. polymorphism')
// # 이터러블 프로토콜을 따른 고차 함수의 다형성
// - 위에서 구현한 map 함수는 이터러블 프로토콜을 따르고 있기 때문에 다형성이 높다.
// * 특정 객체의 메서드가 아닌, 함수이기 때문에 인자의 타입만 맞으면 모두 실행 가능해서 외부 다형성이 높다.
const array = [1, 2, 3];
console.log(array.map(v => v * 2)); // [ 2, 4, 6 ]
console.log(array.__proto__)

// const dom = document.querySelectorAll('*');
// console.log(dom.map(value => console.log(value))); // Uncaught TypeError: dom.map is not a function
// dom.__proto__;
// dom.__proto__.__proto__;
// dom.__proto__.__proto__.__proto__;
// dom.__proto__.__proto__.__proto__.__proto__;
// dom.__proto__.__proto__.__proto__.__proto__.__proto__;
// dom.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__;

// console.log(map((value) => (value), dom));

// - document.querySelectorAll 로 반환되는 값이 이터러블을 따르기 때문이다.
// typeof dom[Symbol.iterator] === 'function'

// - ES6 이전에는 순회 가능한 데이터 컬렉션(배열, 문자열, 유사 배열 객체, DOM 컬렉션 등)이라도 통일된 규약 없이 각자의 방법으로 순회 가능했다.(for, for ... in, forEach 등)
// - 이터레이션 프로토콜의 이터러블 프로토콜을 따르는 이터러블은 배열 뿐 아니라 순회 가능한 데이터 컬렉션을 for ... of, spread syntax(전개 연산자), destructuring assignment(구조분해할당)을 사용할 수 있도록 일원화 했다.
// - 이터러블 프로토콜을 따르는 함수들을 사용하는 것은 조합성이 좋아진다는 뜻이다.

// * 함수형 프로그래밍에서 고차 함수 내부에서 다형성을 책임 지는 것은 값이 아니라 보조 함수다.
// * 개발자가 고차 함수 내부에서 어떤 값을 처리할지 이해를 가지고 보조 함수를 만들어 위임 할수 있으므로 다형성을 높이는데 유리하다.

div('3. filter')
// # filter
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}
log(...under20000);
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};
log(...filter(p => p.price < 20000, products));

div('4. reduce')
// # reduce
// - 값을 축약하는 함수
// - 다른 값을 하나의 값으로 축약해 나가는 함수

const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
  total = total + n;
}
log(total);

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;

log(reduce(add, 0, nums));

log(add(add(add(add(add(0, 1), 2), 3), 4), 5));
// 결국 원리는 함수를 연속적이고 재귀적으로 실행하도록 구현돼 있다.
log(reduce(add, nums));

log(
reduce(
(total_price, product) => total_price + product.price,
// 보조 함수를 통해 내부 다형성을 지원해준다.
0,
products));
// 이터러블을 통해서 외부 다형성도 지원해준다.

