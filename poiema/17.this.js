let dir = function () {
  console.dir(this);
}

// 함수 호출
dir(); // window, global
// window.dir();

// 메소드 호출
let obj = { dir }
obj.dir(); // obj

// 생성자 함수 호출
let instance = new dir(); // instance

// apply, call, bind 호출
let that = { test: 'this' };
dir.call(that); // that
dir.apply(that); // that
dir.bind(that)(); // that

let a = 100;

function outer() {
  let a = 1;
  console.log(1, this);

  function inner1() {
    console.log(2, this)
  }

  const inner2 = function() {
    console.log(3, this)
  }

  const inner3 = () => {
    console.log(4, this)
  }

  inner1();
  inner2();
  inner3();
}

outer();