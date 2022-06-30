class Person {
  // #name = '';

  constructor(name) {
    this.#name = name;
    // SyntaxError: Private field '#name' must be declared in an enclosing class
  }
}