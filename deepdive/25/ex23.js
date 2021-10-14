class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee

// me 객체의 프로토타입은 Person.prototype이다.
console.log(Object.getPrototypeOf(me) === Person.prototype); // true
console.log(me.__proto__ === Person.prototype)
console.log(me instanceof Person); // true

// Person.prototype의 프로토타입은 Object.prototype이다.
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
console.log(me instanceof Object); // true

// me 객체의 constructor는 Person 클래스다.
console.log(me.constructor === Person); // true