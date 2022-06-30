let arrowFuncThis = () => this;

// console.log(arrowFuncThis() === global);
console.log(arrowFuncThis() === window);