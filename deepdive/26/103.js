const obj = {
  x: 1,
  foo() { return this.x },
  bar: function() { return this.x }
}

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1

let { foo, bar } = obj;
console.log(foo()); // undefined
console.log(bar()); // undefined
console.log(obj.foo == foo) // true

// 1
// console.log(new obj.foo()); // TypeError: obj.foo is not a constructor
console.log(new obj.bar()); // bar {}

// 2
console.log(obj.foo.hasOwnProperty('prototype')); // false
console.log(obj.bar.hasOwnProperty('prototype')); // true