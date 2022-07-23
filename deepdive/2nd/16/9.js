const person = {};

Object.defineProperty(person, 'firstName', {
  value: 'raehan',
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(person, 'lastName', {
  value: 'jeong',
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor); // lastName { value: 'jeong', writable: false, enumerable: false, configurable: false }

console.log(Object.keys(person)); // [ 'firstName' ]
console.log(person); // { firstName: 'raehan' }

delete person.lastName; // [[Configurable]] 값이 false기 때문에 재정의가 불가능하다.

Object.defineProperty(person, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true,
});

person.fullName = 'Milky way';
console.log(person); // { firstName: 'Milky', fullName: [Getter/Setter] }