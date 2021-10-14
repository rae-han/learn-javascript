class Person {
  // private 필드 정의
  #name = '';

  constructor(name) {
    this.#name = name;
  }

  // name은 접근자 프로퍼티다.
  get name() {
    // private 필드를 참조하여 trim한 다음 반환한다.
    return this.#name.trim();
  }

  set name(name) {
    this.#name = name;
  }
}

const me = new Person(' Han ');
console.log(me.name); // Han
me.name = 'Rae';
console.log(me.name); // Rae
