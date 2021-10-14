function Person(name) {
  this.name = name;
}

let man = new Person('Han');

console.log(man instanceof Person); // true
console.log(man instanceof Function); // true