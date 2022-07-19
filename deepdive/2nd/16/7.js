const log = console.log;

log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {
//   get: [Function: get __proto__],
//   set: [Function: set __proto__],
//   enumerable: false,
//     configurable: true
// }

log(Object.getOwnPropertyDescriptor(function() {}, 'prototype'));
// { value: {}, writable: true, enumerable: false, configurable: false }

const person = {
  firstName: 'raehan',
  lastName: 'jeong',
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

log(Object.getOwnPropertyDescriptor(person, 'firstName'));
log(Object.getOwnPropertyDescriptor(person, 'fullName'));