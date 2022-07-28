class Person {
  constructor(name) {
    this.name = name;
  }
}

const me = new Person('man');
console.log(me.hasOwnProperty('constructor'));

console.log(me.__proto__ === Person.prototype)
console.log(Person.prototype.constructor === Person)

me.constructor('woman');
console.log(me);