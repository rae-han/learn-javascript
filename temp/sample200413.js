// const array = [1, 2, 3, 4, 5];

// const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킨다.
// nextArrayBad[5] = 6;
// console.log(array); // [ 1, 2, 3, 4, 5, 6 ]
// console.log(nextArrayBad === array); // true - 완전히 같은 배열이다.

// const nextArrayGood = [...array]; // spread 를 통해서 배열 내부 값을 복사한다.
// console.log(nextArrayGood === array); // false - 다른 배열이다.
// nextArrayGood[6] = 7;
// console.log(array); // [ 1, 2, 3, 4, 5, 6 ]
// console.log(nextArrayGood); // [ 1, 2, 3, 4, 5, 6, 7 ]
// console.log(nextArrayGood === array); // false - 다른 배열이다.

// const object = {
//   foo: 'bar',
//   value: 1,
// }

// const nextObjectBad = object; // 객체가 복사되지 않고, 똑같은 객체를 가리킨다.
// nextObjectBad.value = nextObjectBad.value + 1;
// console.log(nextObjectBad === object); // ture - 같은 객체이다.

// const nextObjectGood = {
//   ...object,
//   value: object.value+1,
// };
// console.log(nextObjectGood === object) // false - 다른 객체이다.

const array = [{ value: 1 }, { value: 2 }];
const nextArray = [...array];

nextArray[0].value = 0;

console.log(array[0] === nextArray[0]);

