function outer (num1) {
  return function inner (num2) {
    return function result () {
      num1++;
      num2++;
      return num1+num2;
    }
  }
}

const result = outer(10)(20);
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());
console.log(result());

// const inner = outer(10);
//
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());
// console.log(inner());