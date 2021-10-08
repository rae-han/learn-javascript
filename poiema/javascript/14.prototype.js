function Person(name) {
  this.name = name;
}

let man = new Person('namja');

console.log(man.__proto__ == Person.prototype);
console.log(man.constructor)
console.log(Person.constructor.__proto__ === Person.prototype)