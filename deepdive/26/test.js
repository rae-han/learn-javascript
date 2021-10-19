// class Person {
//   constructor(name) {
//     this.name = name;
//     this.sayHi = () => console.log(`Hi ${this.name}`); // 인스턴스 메서드
//   }

//   sayHello() { console.log(`Hello ${this.name}`); }; // 프로토타입 메서드
// }

// let man = new Person('m');
// let women = new Person('w');

// man.sayHi(); // Hi m
// man.sayHello(); // Hello m

// console.log(man.sayHi === women.sayHi); // false
// console.log(man.sayHello === women.sayHello); // true








class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi = () => console.log(`Hi ${this.name}`); // 인스턴스 메서드
  sayHello() { console.log(`Hello ${this.name}`); }; // 프로토타입 메서드
}

let man = new Person('m');
let women = new Person('w');

man.sayHi(); // Hi m
man.sayHello(); // Hello m

console.log(man.sayHi === women.sayHi); // false
console.log(man.sayHello === women.sayHello); // true