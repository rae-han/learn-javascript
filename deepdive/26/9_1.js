let animal = {
  sayHi() {
    console.log(`나는 동물입니다.`);
  }
};

let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    console.log("나는 식물입니다.");
  }
};

let tree = {
  __proto__: plant,
  sayHi: rabbit.sayHi
};

tree.sayHi();  // 나는 동물입니다.