class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  sayHi = () => `${super.sayHi()} how are you doing?}`;
}

const derived = new Derived('Raehan');
console.log(derived.sayHi()); // Hi! Raehan How are you doing?