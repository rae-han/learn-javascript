let normalFunc = function () {
  return 1;
}

let obj = {
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

let { methodFunc, methodArrowFunc } = obj;

let arrowFunc = () => {
  return 3;
}

console.log(normalFunc.prototype);
// v6: normalFunc {}
// v14: {}
let normalInstance = new normalFunc();

console.log(methodFunc.prototype);
// v6: methodFunc {}
// v14: {}
let methodInstance = new methodFunc();

console.log(methodArrowFunc())

console.log(arrowFunc.prototype);
// v6: undefined
// v14: undefined
// let arrowInstance = new arrowFunc(); // arrowFunc is not a constructor

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

