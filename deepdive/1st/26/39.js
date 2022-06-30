const person = {
  name: 'Raehan',
  sayHi: () => {
    console.log(this); // client env: window, server env: {} (not global)
    console.log(`Hi ${this.name}`); // client: Hi, server: Hi undefined
  },
  sayHello() {
    console.log(`Hello ${this.name}`); // Hello Raehan
  }
}

person.sayHi();
person.sayHello();