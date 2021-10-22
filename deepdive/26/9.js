const base = {
  name: 'Lee',
  sayHi() {
    return `Hi! ${this.name}`;
  }
};

// const derived = {
//   __proto__: base,
//   sayHi() {
//     console.log(this.constructor)

//     return `${super.sayHi()}. how are you doing?`;
//   }
// };

// console.log(derived.sayHi()); // Hi! Lee. how are you doing?

// const derived = {
//   __proto__: base,
//   sayHi: function () {
//     console.log(this.constructor)
//     // return `${super.sayHi()}. how are you doing?`; // SyntaxError: 'super' keyword unexpected here
//   }
// };

// derived.sayHi();
