let foo = function () {
  return 1;
};
// let foo = () => { return 1; } // foo is not a constructor
let obj = { foo };

let bar = function () {};

console.log(foo()); // 일반적인 함수: 1
console.log(new foo()); // 생성자 함수: foo {}
console.log(obj.foo()); // 객체 안의 메서드로서의 함수: 1

console.log(bar()); // undefined
console.log(new bar()); // bar {}