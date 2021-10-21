// # quiz 1

let animal = {
  sayHi() {
    console.log(`나는 동물입니다.`);
  }
};

let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    console.log("나는 식물입니다.");
  }
};

let tree = {
  __proto__: plant,
  sayHi: rabbit.sayHi
};

tree.sayHi(); // ????

// # quiz 2

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

console.log(man.sayHi === women.sayHi); // ????
console.log(man.sayHello === women.sayHello); // ???? 



