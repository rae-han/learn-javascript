// # 메소드 호출
// 함수가 객체의 프로퍼티 값이면 메소드로서 호출된다.
// 이때 메소드 내부의 this는 해당 메소드를 소유한 객체, 해당 메소드를 호출한 객체에 바인딩된다.

let obj1 = {
  name: 'First',
  sayName: function() {
    console.log(this.name)
  }
}

let obj2 = {
  name: 'Second'
}

obj2.sayName = obj1.sayName;

obj1.sayName(); // First
obj2.sayName(); // Second

// 프로토타입 객체도 메소드를 가질 수 있다.
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function() {
  return this.name;
}

let me = new Person('Jeong');
console.log(3, me.getName()); // Jeong

Person.prototype.name = 'Go';
console.log(4, Person.prototype.getName()); // Go

let you = new Person('Rae');
console.log(5, you.getName()); // Rae


