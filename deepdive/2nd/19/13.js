const log = console.log;

function Person(name) {
  this.name = name;
}

const me = new Person('raehan');

log(me.__proto__ === Person.prototype);
log(Person.prototype.constructor === Person);
log(Person.prototype.__proto__ === Object.prototype);
log(Person.__proto__ === Function.prototype)
log(Function.prototype.__proto__ === Object.prototype);
log(Object.prototype.__proto__); // null
log(Function.prototype.constructor === Function)

