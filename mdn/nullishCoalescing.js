// Nullish Coalescing
function printMessage1(text, key) {
  let message = text;
  if(message === null || message === undefined) {
    message = 'Noting to display!';
  }

  console.log(`${key}: ${message}`);
}

function printMessage2(text, key) {
  const message = text ?? 'Noting to display!' // 왼쪽 코드가 undefined, null일 경우 오른쪽 코드 실행

  console.log(`${key}: ${message}`);
}

function printMessage3(text = 'Noting to display', key) {
  console.log(`${key}: ${text}`); // undefined 경우에만 default parameter 사용 가능
}

function printMessage4(text, key) {
  const message = text || 'Noting to display!' // 왼쪽 값이 falsy(undefined, null, false, 0, -0, NaN, ''..)인 경우 오른쪽 실행

  console.log(`${key}: ${message}`);
}

let printMessage = (func, method) => {
  console.log(`# ${method} ########`);
  func('Hello', 'Hello');
  func(undefined, 'undefined');
  func(null, 'null');
  func(0, '0');
  func('', 'spacer');
};

printMessage(printMessage1, 'if statement');
// Hello
// Noting to display!
// Noting to display!
// 0
//
printMessage(printMessage2, 'nullish coalescing');
// Hello
// Noting to display!
// Noting to display!
// 0
//
printMessage(printMessage3, 'default function parameter');
// Hello
// Noting to display
// null
// 0
//
printMessage(printMessage4, 'logical or');
// Hello
// Noting to display!
// Noting to display!
// Noting to display!
// Noting to display!
