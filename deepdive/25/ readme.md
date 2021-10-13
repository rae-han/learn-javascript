자바스크립트는 **프로타타입 기반**(prototype-based) 객체지향 언어다. 

ES5에서는 생성자 함수와 프로토타입, 클로저를 사용하여 객체 지향 언어의 상속, 캡슐화(정보 은닉) 등의 개념을 구현할 수 있다.

```jsx
let Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}`);
  }

  return Person;
}());

let me = new Person('Han');
me.sayHi();
console.log(me) // Person { name: 'Han' }
console.log(me.__proto__) // { sayHi: [Function (anonymous)] }
```

# 자바스크립트에서 클래스란?

자바스크립트에서의 클래스는 클래스 기반 객체지향 프로그래밍에 익숙한 사람을 위한 문법적 설탕으로 실제로 클래스 기반 객체지향 모델을 제공하는 것이 아닌 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용 가능하게 해준다.

[객체 지향 언어의 두 가지 줄기](https://www.notion.so/af21063ecde94ee59d0fe5f4b3bcb738)

클래스와 생성자 함수의 공통점과 차이점

- 공통점
    - 프로토타입 ㄱ반의 인스턴스를 생성
- 차이점

|테스트|클래스|생성자함수|
|---|---|---|
|테슷|테슷|테슷|