let animal = {
  name: '동물',
  sayHi() {
    return `나는 ${this.name}입니다.`;
  }
};

let rabbit = {
  __proto__: animal,
  name: '토끼',
  sayHi() {
    return `${super.sayHi()} 그리고 ${this.name}입니다.`;
  }
};

let pig = {
  __proto__: animal,
  name: '돼지',
  sayHi() {
    return `${super.sayHi()} 그리고 ${this.name}입니다.`;
  }
};

console.log(rabbit.sayHi());
console.log(pig.sayHi());

let plant = {
  sayHi() {
    console.log("나는 식물입니다.");
  }
};

// tree는 plant를 상속받습니다.
let tree = {
  __proto__: plant,
  sayHi: rabbit.sayHi // (*)
};

let name = 'global';

function inner () {
  return name;
}

function outer () {
  let name = 'outer';

  return inner();
}



let func = outer();

console.log(func)
