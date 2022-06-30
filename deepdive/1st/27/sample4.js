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
/*
let testCases = [100000, 1000000, 1200000, 8000000];

let testResults = testCases.forEach(testcase => {
  let testArray = Array.from(new Array(testcase), (_, i) => ({ key: i}))

  console.log(`\n#### testcase: ${testcase} ####`)

  console.time("for of time");
  for(const item of testArray) { 
    // return item;
  }
  console.timeEnd("for of time");

  console.time("forEach time");
  testArray.forEach(item => { })
  console.timeEnd("forEach time");

  console.time("for time");
  for(let i=0; i<testArray.length; i++) { }
  console.timeEnd("for time");
});

console.log(`\n#### testcase ####`)
let testcase = 8000000;
// let testcase = 1200000;
// let testcase = 1000000;
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
*/

let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

console.log(arr.filter(() => false));

let sum1 = arr.reduce((acc, cur) => acc + cur, 0);
console.log(sum1);

let sum2 = arr.reduce((acc, cur) => acc + cur);
console.log(sum2)

const average = arr.reduce((acc, cur, i, { length }) => {
  console.log(acc, length)
  return i === length-1 ? (acc+cur)/length : acc+cur
}, 0);

console.log(average);

const max = arr.reduce((acc, cur) => acc>cur ? acc : cur, 0);
console.log(max);

const count = arr.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});

console.log(count);

