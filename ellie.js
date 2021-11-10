
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
  func(0);
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
  if(person.job?.title) {
    console.log(person.job.title);
  }
}

const displayJobTitle3 = (person) => {
  const title = person.job?.title ?? 'No Job Yet';
  console.log(title)
}

displayJobTitle1(bob);
displayJobTitle2(bob);
displayJobTitle3(bob);
displayJobTitle1(anna);
displayJobTitle2(anna);
displayJobTitle3(anna);


// Template Literals

let raehan = 'raehan';
console.log('hello ' + raehan);
console.log(`hello ${raehan}`);


// 배열 중 짝수를 찾아 4를 곱한 후 다 더하기
let items = [1, 2, 3, 4, 5, 6];

let sum = items.filter(item => item%2===0).map(item => item*4).reduce((a, b) => a+b, 0);
console.log(sum);


const array = ['개', '냥', '말', '꿀', '꿀', '개'];
console.log(array);

console.log(new Set(array))
console.log([...new Set(array)]);


/* 

https://m.ppomppu.co.kr/new/bbs_view.php?id=relay&no=557217

https://m.ppomppu1.co.kr/new/bbs_view.php?id=relay&no=560038

https://m.ppomppu1.co.kr/new/bbs_view.php?id=relay&no=567689

*/