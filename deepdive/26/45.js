class Person {
  constructor() {
    this.name = 'Raehan';
    this.sayHi = () => console.log(`Hi ${this.name}`);
  }
}

let person = new Person();
person.sayHi();