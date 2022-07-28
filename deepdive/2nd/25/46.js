class Person {
  name = 'raehan';

  getName = () => console.log(this.name);

  getterName() {
    console.log(this.name)
  }
}

const me1 = new Person('rae');
const me2 = new Person('han');

console.log(me1, me2);

console.log(me1.name === me2.name); // true
console.log(me1.getName === me2.getName); // false
console.log(me1.getterName === me2.getterName); // true