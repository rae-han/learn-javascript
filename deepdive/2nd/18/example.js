function Func () {}

let instance = new Func();

console.log(instance.__proto__ === Func.prototype)
console.log(Func.prototype.constructor === Func)