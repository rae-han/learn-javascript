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

class Foo {
  constructor(value) {
    this.value = value;
  }

  arrowFunc = () => console.log(`value: ${this.value}`); // 인스턴스 메서드
  methodFunc() { console.log(`value: ${this.value}`); }; // 프로토타입 메서드
}

let bar = new Foo('m');
let baz = new Foo('w');

console.log(bar.arrowFunc === baz.arrowFunc); // false
console.log(bar.methodFunc === baz.methodFunc); // true 



