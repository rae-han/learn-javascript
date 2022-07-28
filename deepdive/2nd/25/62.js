class Base {
  a = 'a';

  constructor(a) {
    this.a = a;
  }
}

class Derived extends Base {
  constructor(b) {
    super('abc');
    this.b = b;
  }

  print() {
    return `a: ${this.a} / b: ${this.b}`;
  }
}

const inst = new Derived('xyz');

console.log(inst.print());
