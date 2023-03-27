// # 함수 호출

// 외부 함수, 내부 함수 둘 다 전역 객체에 바인딩
function outer() {
  console.log(1, this); // window, global

  function inner() {
    console.log(2, this) // window, global
  }

  inner();
}
outer();

// 메소드의 내부 함수도 전역 객체에 바인딩

var value = 1;

// function fn () {
//   console.log(3, this) // obj
//   console.log(this.value) // 100
//
//   function fnInner() {
//     console.log(4, this) // window, global
//     console.log(this.value) // 1
//   }
//
//   fnInner();
// }

let obj = {
  value: 100,
  fn: function() {
    console.log(3, this) // obj
    console.log(this.value) // 100

    function fnInner() {
      console.log(4, this) // window, global
      console.log(this.value) // 1
    }

    fnInner();
  },
  cb: function() {
    setTimeout(function() {
      console.log(5, this) // window, global
      console.log(this.value) // 1
    }, 100)
  }
  // fn,
}

obj.fn();

// 콜백 함수도 전역객체에 바인딩
obj.cb();

// 내부함수는 일반 함수, 메소드, 콜백함수 어디에서 선언되었든 관계없이 this는 전역객체를 바인딩한다.
// 더글라스 크락포드는 "이것은 설계 단계의 결함으로 메소드가 내부함수를 사용하여 자신의 작업을 돕게 할 수 없다는 것을 의미한다" 라고 말한다.
// 내부 함수의 this가 전역 객체를 참조하는 것을 회피하려면 that을 사용하던가
// this를 명시적으로 바인딩 할 수 있는 apply, call, bind 메소드를 사용하여야 한다.




