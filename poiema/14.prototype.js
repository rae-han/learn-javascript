console.log(`######## ######## ${1} ######## ########`)
let student = {
  name: '학생',
  age: 20
}

console.log(student.__proto__);
console.log(student.prototype)
console.log(`######## ######## ${1} ######## ########`)


function Person(name) {
  this.name = name;
}

let man = new Person('namja');

console.log(man.__proto__ == Person.prototype);
console.log(man.constructor)
console.log(Person.constructor.__proto__ === Person.prototype)