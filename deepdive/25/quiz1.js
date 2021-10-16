class Person {
  constructor(name) {
    this.name = name;
  }
}

class Deveoloper extends Person {
  constructor(name) {
    this.name = name;
    this.created = Date.now();
  }
}

let me = new Deveoloper("Han"); // Error: this is not defined