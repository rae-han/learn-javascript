function Person(name) {
  this.name = name;

  this.sayHey = () => { console.log(`Hey ${this.name}`)}
}

// Person.prototype.sayHello = function () { console.log(`Hello ${this.name}`); };

Person.prototype = {
  constructor: Person,
  // ...Person.prototype,
  sayHi() { console.log(`Hi ${this.name}`); }
};

const person = new Person('Raehan');
person.sayHi(); // Hi Raehan
// person.sayHello(); // person.sayHello is not a function
person.sayHey();