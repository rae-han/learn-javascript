function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);
Person.prototype.sayHello = function () { console.log(`Hello ${this.name}`); };

const person = new Person('Raehan');
person.sayHi(); // Hi or Hi undefined
person.sayHello(); // Hello Raehan