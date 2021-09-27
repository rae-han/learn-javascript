// Nullish Coalescing

function printMessage1(text) {
  let message = text;

  if(message === null || message === undefined) {
    message = 'Noting to display 😜';
  }

  console.log(message)
}

function printMessage2(text) {
  const message = text ?? 'Noting to display!' // 왼쪽 코드가 undefined, null일 경우 오른쪽 코드 실행

  console.log(message)
}

function printMessage3(text = 'Noting to display') {
  console.log(text); // undefined 경우에만 default parameter 사용 가능
}

function printMessage4(text) {
  const message = text || 'Noting to display!' // 왼쪽 값이 falsy(undefined, null, false, 0, -0, NaN, ''..)인 경우 오른쪽 실행

  console.log(message)
}

let printMessage = (func) => {
  func('Hello');
  func(undefined);
  func(null);
  func(0)
  func('')
};

printMessage(printMessage1);
printMessage(printMessage2);
printMessage(printMessage3);
printMessage(printMessage4);


// Object Destructuring

const person = {
  name: 'Julia',
  age: 20,
  phone: '01023456789'
}

function displayPerson1(person) {
  console.log(person.name, person.age)
}
function displayPerson2(person) {
  const name = person.name;
  const age = person.age;
  console.log(name, age)
}
function displayPerson3(person) {
  const {name, age} = person;
  console.log(name, age)
}
function displayPerson4({name, age} = person) {
  console.log(name, age)
}

displayPerson1(person);
displayPerson2(person);
displayPerson3(person);
displayPerson4(person);

// Spread Syntax
const item = { tpye: 'cloths' };
const detail = { size: '100', price: 20 };

const shirt0 = Object.assign(item, detail);
const shirt = { ...item, ...detail, price: 20 };

console.log(shirt0, shirt)

let fruits = ['흑', '백'];
fruits.push('적');
fruits = [...fruits, '청'];
fruits.unshift('황')
fruits = ['녹', ...fruits];
console.log(fruits)
fruits2 = ['투명']
console.log(fruits.concat(fruits2));
fruits = [...fruits, ...fruits2];
console.log(fruits)

// Optional Chaining

const bob = {
  name: 'Julia',
  age: 20,
};

const anna = {
  name: 'Julia',
  age: 20,
  job: {
    title: 'Software Engineer'
  }
}

const displayJobTitle1 = (person) => {
  if(person.job && person.job.title) {
    console.log(person.job.title);
  }
}
const displayJobTitle2 = (person) => {
  if(person.job?.job) {
    console.log(person.job.title);
  }
}