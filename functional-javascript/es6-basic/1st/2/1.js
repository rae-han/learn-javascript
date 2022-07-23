const log = console.log;

const arr = [1, 2, 3, 4]
const str = 'abcxyz';

// es5
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
}

// es6
for (const c of str) {
  console.log(c);
}

log('Set -----------');
const set = new Set([1, 2, 3]);
for (const a of set) log(a);
// set[1]로는 접근 불가. 즉 원래의 for 문의 방식이 아닌 for of 문은 다른 방식으로 추상화 돼 있다.
// -> Symbol.iterator
// arr, set, map 의 프로퍼티 Symbol.iterator 에 뭔가 담겨있다.
// ex set[Symbol.iterator] map[Symbol.iterator]

log('Map -----------');
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const a of map) log(a);
for (const a of map.keys()) log(a);
for (const a of map.values()) log(a);
for (const a of map.entries()) log(a);

// ## 이터러블/이터레이터 프로토콜
// - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
// -> arr 는 이터러블이다.
// - 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
// -> const iterator = arr[Symbol.iterator]();
// -> iterator.next(); ...
// - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약

// 사용자 정의 이터러블
log('######## custom iterable')
const iterable = {
  [Symbol.iterator]() { // 이터러블은 반드시 Symbol.iterator 메서드를 구현하고 있어야 한다.
    let i = 3;
    return { // 이터레이터를 반환해야 한다.
      next() { // 넥스트 메서드를 가지고 있고 이 메서드는 value, done을 가지고 있는 객체이다.
        return i == 0 ? {done: true} : {value: i--, done: false};
      },
      [Symbol.iterator]() {
        // 잘 구현된 이터러블은 이터레이터를 만들었을때 이 이터레이터를 진행하다가 순회할 수도 있게 돼 있다.
        // 그걸 위한 코드
        // const iterator = arr[Symbol.iterator](); 를 했을 때
        // iterator === iterator[Symbole.iterator]() 이 되야한다.
        return this;
      }
    }
  }
};
let iterator = iterable[Symbol.iterator]();
iterator.next();
iterator.next();
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
for (const a of iterator) log(a);

// 전개 연산자 역시 이터러블을 따른다.
const a = [1, 2];
// a[Symbol.iterator] = null;
const b = [...a, ...[3, 4]];
log([...a, ...arr, ...set, ...map.keys()]);

