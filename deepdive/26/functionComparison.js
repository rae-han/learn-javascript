var normalFunc = function () {
  return 1;
}

var obj = {
  number: 2,
  methodFunc() {
    return this.number;
  },
  methodNormalFunc: function () {
    return this.number*2;
  },
  methodArrowFunc: () => {
    return this.number*3;
  }
}

var { methodFunc, methodArrowFunc } = obj;

var arrowFunc = () => {
  return 3;
}

console.log(normalFunc.prototype);
// v6: normalFunc {}
// v14: {}
var normalInstance = new normalFunc();

console.log(methodFunc.prototype);
// v6: methodFunc {}
// v14: {}
var methodInstance = new methodFunc();

console.log(methodArrowFunc())

console.log(arrowFunc.prototype);
// v6: undefined
// v14: undefined
// var arrowInstance = new arrowFunc(); // arrowFunc is not a constructor

console.log(methodFunc()) 




// console.log(normalFunc);
// // v4: 
// // v14: 

// console.log(methodFunc);
// // v4: 
// // v14: 

// console.log(arrowFunc);
// // v4: 
// // v14: 

// 생성자 함수 화살표 함수 constructor prototype super arguments