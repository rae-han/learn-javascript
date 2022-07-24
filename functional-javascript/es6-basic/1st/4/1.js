const log = console.log;

const products = [
{name: '반팔티', price: 15000},
{name: '긴팔티', price: 20000},
{name: '핸드폰케이스', price: 15000},
{name: '후드티', price: 30000},
{name: '바지', price: 25000}
];

// # map
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
  // 함수형 프로그래밍은 외부에 직접적인 변화를 일으키거나 다른 함수를 호출하는 것이 아니라,
  // 인자와 리턴 값을 통해 소통한다.
  // iter 뜻은 맵 함수의 보조 함수가 이터러블을 따른다 라는 의미
  // 기존에는 어떤 값을 수집할 것인지 명시적으로 적었다면 함수형 프로그래밍에서는 추상화를 통해, f라는 함수에게 완전히 위임한다.
};

// let names = [];
// for (const p of products) {
//   names.push(p.name);
// }
// log(names);

log(map(p => p.name, products));

// let prices = [];
// for (const p of products) {
//   prices.push(p.price);
// }
// log(prices);

log(map(p => p.price, products));

// 함수형 프로그래밍에서는 map 이라는 함수에 보조함수를 통해서, 이터러블 규약을 따르는 어떤 값의 특정 값을 수집하겠다고 전달하는 식으로 사용한다.
// 추가로 맵 함수는 고차함수이기도 하다. 함수를 값으로 다루면서 내가 원하는 시점에 인자를 적용한다.



// // # 이터러블 프로토콜을 따른 map의 다형성
//
//
// log([1, 2, 3].map(a => a + 1));
//
// log(map(el => el.nodeName, document.querySelectorAll('*')));
//
// // const it = document.querySelectorAll('*')[Symbol.iterator]();
// // log(it.next());
// // log(it.next());
// // log(it.next());
// // log(it.next());
// // log(it.next());
//
// function* gen() {
//   yield 2;
//   if (false) yield 3;
//   yield 4;
// }
//
// log(map(a => a * a, gen()));
//
// let m = new Map();
// m.set('a', 10);
// m.set('b', 20);
// log(new Map(map(([k, a]) => [k, a * 2], m)));
//
//
//
//
// // # filter
//
//
// const filter = (f, iter) => {
//   let res = [];
//   for (const a of iter) {
//     if (f(a)) res.push(a);
//   }
//   return res;
// };
//
// // let under20000 = [];
// // for (const p of products) {
// //   if (p.price < 20000) under20000.push(p);
// // }
// // log(...under20000);
//
// log(...filter(p => p.price < 20000, products));
//
// // let over20000 = [];
// // for (const p of products) {
// //   if (p.price >= 20000) over20000.push(p);
// // }
// // log(...over20000);
//
// log(...filter(p => p.price >= 20000, products));
//
// log(filter(n => n % 2, [1, 2, 3, 4]));
//
// log(filter(n => n % 2, function* () {
//   yield 1;
//   yield 2;
//   yield 3;
//   yield 4;
//   yield 5;
// }()));
//
//
//
// // # reduce
//
//
// const nums = [1, 2, 3, 4, 5];
//
// let total = 0;
// for (const n of nums) {
//   total = total + n;
// }
// log(total);
//
// const reduce = (f, acc, iter) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     acc = iter.next().value;
//   }
//   for (const a of iter) {
//     acc = f(acc, a);
//   }
//   return acc;
// };
//
// const add = (a, b) => a + b;
//
// log(reduce(add, 0, [1, 2, 3, 4, 5]));
// // 15
//
// log(add(add(add(add(add(0, 1), 2), 3), 4), 5));
// // 15
//
// log(reduce(add, [1, 2, 3, 4, 5]));
// // 15
//
//
//
//
//   log(
//   reduce(
//   (total_price, product) => total_price + product.price,
//   0,
//   products));
