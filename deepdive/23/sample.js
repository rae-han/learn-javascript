// // 전역 변수 선언
// const x = 1;
// const y = 2;

// // 함수 정의
// function foo(a) {
//   // 지역 변수 선언
//   const x = 10;
//   const y = 20;

//   // 메서드 호출
//   console.log(a + x + y); // 130
// }

// // 함수 호출
// foo(100);

// // 메서드 호출
// console.log(x + y); // 3


// #############

// var x = 1;
// const y = 2;

// function foo (a) {
//   var x = 3;
//   const y = 4;

//   function bar (b) {
//     const z = 5;
//     console.log(a + b + x + y + z);
// }
//   bar(10);
// }

// foo(20); // 42


let a = 10;

{
  console.log(a)
  let a = 10;
}
