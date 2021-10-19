// class Person {
//   constructor(name) { this.name = name };
//   sayHi = () => console.log(`Hi ${this.name}`);
// }

// const person = new Person('Raehan');
// person.sayHi(); // Hi Raehan

class Person {
  name = 'Raehan';
  sayHi = () => console.log(`Hi ${this.name}`);
}

const person = new Person();
person.sayHi(); // Hi Raehan