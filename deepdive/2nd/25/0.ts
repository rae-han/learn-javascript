class Person {
  name: string;

  constructor(name) {
    this.name = name
  }

  sayHi() {
    return `Hi! ${this.name}`
  }

  static sayHello() {
    return `Hello ${this.name}`
  }

  #sayBye() {
    return `Bye ${this.name}`
  }
}