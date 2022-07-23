const person = new Object();

person.name = 'raehan';
person.sayHello = function () { console.log(`Hello, ${this.name}!`) }

person.sayHello();