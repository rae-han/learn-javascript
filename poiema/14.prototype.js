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

console.dir(Person2);
console.dir(man2)
console.log(Person2.prototype);
console.dir(Person2.prototype);
console.log(man2.prototype);
console.log(man2.__proto__ === Person2.prototype);

console.log(`######## ######## ${5} ######## ######## ######## ########`)
console.log(`######## ######## 객체 리터럴 방식으로 생성된 객체의 프로토타입 체인`)

let man3 = {
  name: 'Han',
  gender: 'male',
  sayHello() {
    console.log(`Hi! my name is ${this.name}`)
  }
};

console.dir(man3);
console.log(man3);
console.dir(man3.__proto__)
console.log(man3.__proto__ === Object.prototype);
console.dir(man3.__proto__.constructor)
console.log(man3.__proto__.constructor.__proto__)
console.log(man3.__proto__.constructor.__proto__ === Function.prototype);
console.dir(man3.__proto__.constructor.__proto__.__proto__)
console.log(man3.__proto__.constructor.__proto__.__proto__ === Object.prototype)

// q
// console.log(man3.__proto__ === Object.prototype);   // ① true
// console.log(Object.prototype.constructor === Object); // ② true
// console.log(Object.__proto__ === Function.prototype); // ③ true
// console.log(Function.prototype.__proto__ === Object.prototype); // ④ true


console.log(`######## ######## ${6} ######## ######## ######## ########`)
console.log(`######## ######## 생성자 함수로 생성된 객체의 프로토타입 체인`)

function Person4({ name, gender }) {
  this.name = name;
  this.gender = gender;
  this.sayHello = function(){
    console.log(`Hi! my name is ${this.name}`);
  }
}

let man4 = new Person4({
  name: 'Han',
  gender: 'male'
});

console.dir(Person4);
console.dir(man4);

console.log(man4);
console.dir(man4.__proto__);
console.log(man4.__proto__);
console.log(man4.__proto__ === Person4.prototype);
console.dir(man4.__proto__.constructor)
console.log(man4.__proto__.constructor === Person4.prototype.constructor);
console.dir(man4.__proto__.constructor.__proto__)
console.log(man4.__proto__.constructor.__proto__ === Function.prototype)
console.dir(man4.__proto__.constructor.__proto__.__proto__)
console.log(man4.__proto__.constructor.__proto__.__proto__ === Object.prototype)

// console.log(man4.__proto__ === ); 
// console.log(Person4.prototype.__proto__ === ); 
// console.log(Person4.prototype.constructor === ); 
// console.log(Person4.__proto__ === ); 
// console.log(Function.prototype.__proto__ === ); 

console.log(man4.__proto__ === Person4.prototype); 
console.log(Person4.prototype.__proto__ === Object.prototype); 
console.log(Person4.prototype.constructor === Person4); 
console.log(Person4.__proto__ === Function.prototype); 
console.log(Function.prototype.__proto__ === Object.prototype); 