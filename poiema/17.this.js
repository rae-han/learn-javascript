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