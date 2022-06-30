const objectNormalFunc = {
  normalFunc: function() { return 'normal' }
};

const objectMethodFunc = {
  methodFunc() { return 'special' }
}

console.dir(objectNormalFunc.normalFunc.prototype); // {}
console.dir(objectMethodFunc.methodFunc.prototype); // undefined