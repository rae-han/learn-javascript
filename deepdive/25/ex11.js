class Person {
  constructor(name) {
    this.name = name;
  }
}

// a
console.log(typeof Person); // function
console.log(Person.__proto__ === Function.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Person.prototype.constructor === Person) // true

const me = new Person('Han');
console.log(me);
console.log(me.name === 'Han')