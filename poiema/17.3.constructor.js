// # 생성자 함수 호출
function Person(name) {
  this.name = name;
}

let me = new Person('RH');
console.log(me); // Person { name: 'RH' }

let you = Person('You');
console.log(you); // undefined;

/**
 * ## 생성자 함수 호출 동작 방식
 * 1. 빈 객체 생성 및 this 바인딩
 * 생성자 함수 코드 실행 전 생성하는 객체가 될 빈 객체를 생성한다.
 * 생성자 함수 내에서 사용되는 this는 이 빈 객체를 기리킨다.
 * 생성된 빈 객체는 생성자 함수의 prototype 프로퍼티가 가리키는 객체를 자신의 프로토타입 객체로 설정한다.
 */

// 객체 리터럴 방식의 생성된 객체 프로토타입(__proto__)은 Object.prototype이고
// 생성자 함수 방식의 생성된 객체 프로토타입은 [해당 생성자 함수].prototype(ex. Person.prototype) 이다

// new 없이 호출하는 경우 this는 전역 객체에 바인딩 되고
// new 연산자를 사용하여 호출하는 경우 this는 암묵적으로 생성한 빈 객체에 바인딩 된다.

console.log(name); // You

