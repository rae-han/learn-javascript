// class Numbers {
//   numberArray = [];

//   multiply(arr) {
//     arr.forEach(function (item) {
//       console.log(this)
//       // TypeError: Cannot read property 'numberArray' of undefined
//       this.numberArray.push(item * item);
//     });
//   }
// }

// const numbers = new Numbers();
// numbers.multiply([1, 2, 3]);

// let testcase = 8000000;
// let testcase = 1200000;
let testcase = 1000000;
// let testcase = 100000;

let testArr = Array.from(new Array(testcase), (_, i) => ({ key: i}))

console.time("for of time");
for(const item of testArr) { 
  // return item;
}
console.timeEnd("for of time");

console.time("forEach time");
testArr.forEach(item => { })
console.timeEnd("forEach time");

console.time("for time");
for(let i=0; i<testArr.length; i++) { }
console.timeEnd("for time");