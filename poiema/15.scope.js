// 암묵적 전역
var x = 10; // 전역 변수

function foo () {
  y = 20; // 선언하지 않은 식별자
  console.log(x + y);
}

foo(); // 30

