# 18.1. 일급 객체

아래와 같은 조건을 만족하는 객체를 일급 객체라 한다.

1. 무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다.
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

# 18.2. 함수 객체의 프로퍼티

함수도 객체이기 때문에 프로퍼티를 가질 수 있다.

```jsx
function square (number) {
  return number * number;
}

console.dir(square);
// arguments: null
// caller: null
// length: 1
// name: "square"
// prototype: {constructor: ƒ}
// [[FunctionLocation]]: VM11295:1
// [[Prototype]]: ƒ ()
// [[Scopes]]: Scopes[2]
```

참고로 `arguments`, `caller`, `length`, `name`, `prototype` 프로퍼티는 모두 함수 객체의 데이터 프로퍼티다. 이 프로퍼티들은 일반 객체에는 없는 함수 객체 고유의 프로퍼티다. 하지만 `__proto__`는 접근자 프로퍼티이며, 함수 객체 고유의 프로퍼티가 아니라 Object.prototype 객체의 프로퍼티를 상속받은 것이다.

```jsx
function square (number) {
  return number * number;
}

console.log(Object.getOwnPropertyDescriptors(square))
// {
//   length: { value: 1, writable: false, enumerable: false, configurable: true },
//   name: {
//     value: 'square',
//       writable: false,
//       enumerable: false,
//       configurable: true
//   },
//   arguments: {
//     value: null,
//       writable: false,
//       enumerable: false,
//       configurable: false
//   },
//   caller: {
//     value: null,
//       writable: false,
//       enumerable: false,
//       configurable: false
//   },
//   prototype: { value: {}, writable: true, enumerable: false, configurable: false }
// }

console.log(Object.getOwnPropertyDescriptor(square, '__proto__'));
// undefined
// __proto__ 는 square 함수의 프로퍼티가 아니다.

console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {
//   get: [Function: get __proto__],
//   set: [Function: set __proto__],
//   enumerable: false,
//     configurable: true
// }
// __proto__ 는 Object.prototype 객체의 접근자 프로퍼티다.

console.log(square.__proto__ === Function.prototype); // true
console.log(square.prototype.__proto__ === Object.prototype); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
```

## 18.2.1. arguments 프로퍼티

함수 객체의 `arguments` 프로퍼티 값은 `arguments` 객체다. `arguments` 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용된다.

자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.

`arguments` 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.

## 18.2.2. caller 프로퍼티

`caller` 프로퍼티는 함수 자신을 호출한 함수를 가리킨다.

## 18.2.3. length 프로퍼티

함수 객체의 `length` 프로퍼티는 함수를 정의할 때 선언한 매개변수의 개수를 가리킨다.

## 18.2.4. name 프로퍼티

함수 객체의 `name` 프로퍼티는 함수 이름을 나타낸다.

참고로 name 프로퍼티는 ES5, ES6에서 동작이 다르다. 익명 함수 표현식의 경우 ES5에서 `name` 프로퍼티는 빈 문자열을 값으로 가지지만, ES6에서는 함수 객체를 가리키는 식별자를 값으로 갖는다.

## 18.2.5. __proto__ 접근자 프로퍼티

모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 갖고, 이것은 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.

`__proto__` 프로퍼티는 `[[Prototype]]` 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티다.

## 18.2.6. prototype 프로퍼티

`prototype` 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 `constructor`만이 소유하는 프로퍼티다.

`prototype` 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 호출될 때, 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.

```jsx
function Func () {}

let instance = new Func();

console.log(instance.__proto__ === Func.prototype)
console.log(Func.prototype.constructor === Func)
console.log(instance.__proto__.constructor === Func)
```