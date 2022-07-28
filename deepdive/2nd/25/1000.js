const MyClass = class NamedClass {
  a = 1;

  constructor(num) {
    this.b = num;
  }

  #c = 3;
  static d = 4;
  static {
    this.d = 5;
  }
  static #e = 6;

  get getC() { return this.#c };
  set setC(value) { this.#c = value};

  get getE1() { return this.#e };
  static get getE2() { return this.#e };

  sayHi() {
    return 'Hi!'
  }

  static sayHi() {
    return 'HI2!'
  }

  #privateMethod() {
    return 'private method';
  }

  get privateAccessor() {
    return this.#privateMethod;
  }

  static #staticPrivateMethod() {
    return 'static private method';
  }

  static staticPublicMethod1() {
    return NamedClass.#staticPrivateMethod();
  }
  static staticPublicMethod2 () {
    return this.#staticPrivateMethod();
  }
}


const instance = new MyClass(2);

// class name
console.log(MyClass); // [class NamedClass]
// console.log(NamedClass); // NamedClass is not defined

// field
console.log(instance); // NamedClass { a: 1, b: 2 }
console.log(MyClass); // [class NamedClass] { d: 5 }
// 직접적으로 #c에 접근하는 방법은 없다.
instance.setC = 8;
console.log(instance.getC); // 8

// console.log(instance.getE); // TypeError: Cannot read private member #e from an object whose class did not declare it
// console.log(MyClass.#e); // SyntaxError: Private field '#e' must be declared in an enclosing class
console.log(MyClass.getE1); // undefined
console.log(MyClass.getE2); // 6

console.log(instance.sayHi()); // Hi!
console.log(MyClass.sayHi()); // HI2!

// console.log(instance.#privateMethod());
console.log(instance.privateAccessor());

console.log(MyClass.staticPublicMethod1());

console.log(MyClass.staticPublicMethod2());











// class Translator {
//   static translations = {
//     yes: 'ja',
//     no: 'nein',
//     maybe: 'vielleicht',
//   };
//   static englishWords = [];
//   static germanWords = [];
//   static { // (A)
//     for (const [english, german] of Object.entries(this.translations)) {
//       this.englishWords.push(english);
//       this.germanWords.push(german);
//     }
//   }
// }