# 16. 프로퍼티 어트리뷰트

# 16.1. 내부 슬롯과 내부 메서드

자바스크립트 엔진의 구현 알고리즘을 설명하기 위해 ES 사양에서 사용하는 의사 프로퍼티와 의사 메서드.

개발자가 직접 접근할 수 없지만 일부 내부 슬롯과 메서드는 간접적으로 접근 가능한 수단을 제공하긴 한다.([[Prototype]] → __proto__)

```jsx
const o = {};

o.__proto__ // Object.prototype
```

# 16.2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다. 프로퍼티의 상태란 프로퍼티의 값, 값의 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부를 말한다.

프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값인 내부 슬롯으로 직접 접근할 수 없지만 Object.getOwnPropertyDescriptor 메서드를 사용하면 간접적으로 확인 가능한데, 이 메서드가 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.

# 16.3. 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분 가능하다.

- 데이터 프로퍼티

  키와 값으로 구성된 일반적인 프로퍼티

- 접근자 프로퍼티

  자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티


## 16.3.1. 데이터 프로퍼티

데이터 프로퍼티는 다음과 같이 4개의 프로퍼티 어트리뷰트를 갖는데, 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.

![스크린샷 2022-07-19 오후 4.12.24.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/614dfdd2-bcc8-4f8a-bbd4-841a7bf72762/스크린샷_2022-07-19_오후_4.12.24.png)

## 16.3.2. 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티다.

- [[Get]] (get)

  접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자.

- [[Set]] (set)

  접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수.

- [[Enumerable]] (enumerable)
- [[Configurable]] (configurable)

---

### ref. 프로토타입

프로토타입은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체다. 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속한다. 프로토타입 객체의 프로퍼티나 메서드를 상속받은 하위 객체는 자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용할 수 있다.
프로토타입 체인은 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조를 말한다. 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면 프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례대로 검색한다

---

접근자 프로퍼티와 데이터 프로퍼티는 아래와 같이 구분 가능하다.

```jsx
const log = console.log;

// 일반 객체의 __proto__는 접근자 프로퍼티다.
log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {
//   get: [Function: get __proto__],
//   set: [Function: set __proto__],
//   enumerable: false,
//     configurable: true
// }

// 함수 객체의 prototype은 데이터 프로퍼티다.
log(Object.getOwnPropertyDescriptor(function() {}, 'prototype'));
// { value: {}, writable: true, enumerable: false, configurable: false }
```

# 16.4. 프로퍼티 정의

포로퍼티 정의란 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의 하는 것을 말한다.

Object.defineProperty 메서드를 사용하여 프로퍼티의 어트리뷰트를 정의할 수 있다.

```jsx
const person = {};

Object.defineProperty(person, 'firstName', {
  value: 'raehan',
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(person, 'lastName', {
  value: 'jeong',
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor); // lastName { value: 'jeong', writable: false, enumerable: false, configurable: false }

console.log(Object.keys(person)); // [ 'firstName' ]
console.log(person); // { firstName: 'raehan' }

delete person.lastName; // [[Configurable]] 값이 false기 때문에 재정의가 불가능하다.

Object.defineProperty(person, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true,
});

person.fullName = 'Milky way';
console.log(person); // { firstName: 'Milky', fullName: [Getter/Setter] }
```

Object.defineProperties 메서드를 사용하면 여러 개의 프로퍼티를 한 번에 정의할 수 있다.

# 16.5. 객체의 변경 방지

객체는 변경 가능한 값이므로 재할당 없이 직접 병경할 수 있는데, 자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공한다.

| 구분 | 메서드 | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| --- | --- | --- | --- | --- | --- | --- |
| 객체 확장 금지 | Object.preventExtensions |  | O | O | O | O |
| 객체 밀봉 | Object.seal |  |  | O | O |  |
| 객체 동결 | Object.freeze |  |  | O |  |  |

## 16.5.1. 객체 확장 금지(Object.preventExtensions)

객체의 확장을 금지하는데, 확장이 금지된 객체는 프로퍼티 추가가 금지된다. 즉 동적 추가와 Object.defineProperty 둘 다 금지된다.

## 16.5.2. 객체 밀봉(Object.seal)

밀봉된 객체는 읽기와 쓰기만 가능하다.

밀봉된 객체인지 여부는 Object.isSealed 메서드로 확인할 수 있다.

## 16.5.3. 객체 동결(Object.freeze)

동결된 객체는 읽기만 가능하다.

동결된 객체인지 여부는 Object.isFrozen 메서드로 확인할 수 있다.

## 16.5.4. 불변 객체

위 3가지 방법은 얕은 변경 방지로 직속 프로퍼티만 방지되고 중첩 객체까지는 영향을 주지 못한다.

중첩 객체까지 동결하여 변경이 불가능한 읽기 전용의 불변 객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze 메서드를 호출해야 한다.