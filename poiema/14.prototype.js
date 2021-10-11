console.log(`######## ######## ${1} ######## ######## ######## ########`)
let student = {
  name: '학생',
  age: 20
}

console.dir(student.__proto__); // [Object: null prototype] {}
console.dir(student.prototype) // undefined
console.log(student.__proto__ === Object.prototype); // true

console.log(`######## ######## ${2} ######## ######## ######## ########`)
console.log(Function.prototype.__proto__ === Object.prototype) // true
console.log(Function.prototype) // {}
console.log(Function.prototype.__proto__) // [Object: null prototype] {}
console.log(Object.prototype) // [Object: null prototype] {}


console.log(`######## ######## ${3} ######## ######## ######## ########`)
function Person1(name) {
  this.name = name;
}

let man1 = new Person1('Han');

console.log(man1.__proto__); // {}
console.log(man1.prototype); // undefined

console.log(Person1.prototype) // {}
console.log(man1.prototype) // undefined

console.log(Person1.__proto__); // {}
console.log(Function.prototype) // {}
console.log(Person1.__proto__ === Function.prototype); // true
console.log(Person1.prototype); // {}
console.log(man1.__proto__); // {}
console.log(Person1.prototype === man1.__proto__); // true

console.log(`######## ######## ${4} ######## ######## ######## ########`)
function Person2(name) {
  this.name = name;
}

let man2 = new Person2('Han');

console.log(Person2.prototype.constructor === Person2) // true
console.log(man2.constructor === Person2) // 



