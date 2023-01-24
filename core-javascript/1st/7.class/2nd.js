const ES5 = function (name) {
  this.name = name;
}

ES5.staticMethod = function () {
  console.log('ES5 staticMethod normalFunction', this)
  // [Function: ES5] { staticMethod: [Function (anonymous)] }
  return this.name + ' static method';
}

ES5.prototype.method = function () {
  console.log('ES5 method normalFunction', this)
  // { name: 'ECMAScript 5' }
  return this.name + ' method';
}

const es5Instance = new ES5('ECMAScript 5')
console.log(ES5.staticMethod());
console.log(es5Instance.method());

const ES6 = class {
  constructor(name) {
    this.name = name;
  }

  static staticMethod () {
    console.log('ES6 staticMethod, normalFunction', this); // class ES6
    // [class ES6]
    return this.name + ' static method';
  }

  method () {
    console.log('ES6 method, normalFunction', this);
    // { name: 'ECMAScript 6' }
    return this.name + ' method';
  }
}

const es6Instance = new ES6('ECMAScript 6');
console.log(ES6.staticMethod()) // ES6
console.log(es6Instance.method()) // ecma