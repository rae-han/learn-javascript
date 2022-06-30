let obj = {
  num: 10,
  func: function () { return this.num }
}

// 메서드로서 호출
console.log(obj.func()); // 10

// 일반 함수로서 호출
let { func } = obj;
console.log(func()); // undefined

console.log(func.prototype)

// 생성자 함수로서 호출
console.log(new obj.func());
