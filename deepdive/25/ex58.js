function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브클래스
class Derived1 extends (condition ? Base1 : Base2) {}
class Derived2 extends (!condition ? Base1 : Base2) {}

const derived1 = new Derived1();
const derived2 = new Derived2();
console.log(derived1); // Derived {}
console.log(derived2); // Derived {}

console.log(derived1 instanceof Base1); // true
console.log(derived1 instanceof Base2); // false
console.log(derived2 instanceof Base1); // true
console.log(derived2 instanceof Base2); // false