연산자는 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입, 지수 연산 등을 수행해 하나의 값을 만든다. 이때 연산의 대상을 피연산자라 하고, 피연선자는 값으로 평가될 수 있는 표현식이어야 한다. 또한 피연산자와 연산자의 조합으로 이뤄진 연산자 표현식도 값으로 평가될 수 있는 표현식이다.

# 7.1. 산술 연산자

산술 연산자는 피연산자를 대상으로 수학적 계산을 수행해 새로운 숫자 값을 만든다. 산술 연산이 불가능할 경우, NaN을 반환한다. 산술 연산자는 피연산자의 개수에 따라 이항 산술 연산자와 단항 산술 연산자로 구분할 수 있다.

## 7.1.1. 이항 산술 연산자

이항 산술 연산자는 2개의 피연선자를 산술 연산하여 숫자 값을 만든다.

모든 이항 산술 연산자는 피연산자의 값을 변경하는 부수 효과가 없다. 즉 언제나 새로운 값을 만든다.

| 이항 산술 연산자 | 의미 | 부수 효과 |
| --- | --- | --- |
| + | 덧셈 | X |
| - | 뺄셈 | X |
| * | 곱셈 | X |
| / | 나눗셈 | X |
| % | 나머지 | X |

## 7.1.2. 단항 산술 연산자

단항 산술 연산자는 1개의 피 연산자를 산술 연산하여 숫자 값을 만든다.

주의할 점은 증가/감소(`++`/`--`) 연산자는 피연산자의 값을 변경하는 부수 효과가 있다는 것이다.

증가/감소 연산자는 위치에 의미가 있는데 앞에 위치한 전위 증가/감소 연산자일 경우 피연산자의 값을 증가/감소 시킨 후, 다른 연산자를 수행하고, 피연산자 뒤에 위치한 후위 증가/감소 연산자의 경우 다른 연산을 수행한 후 피연산자의 값을 증가/감소시킨다.

`+` 단항 연산자의 경우 숫자에는 아무 효과가 없고, 숫자 타입이 아닌 피연산자에 사용하면 숫자 타입으로 변환하여 반환한다.

`-` 단항 연산자는 피연산자의 부호를 반전시킨다. + 단항 연산자와 마찬가지로 숫자 타입이 아닌 피연산자에 사용하면 피연산자를 숫자 타입으로 변환하여 반환한다.

## 7.1.3. 문자열 연결 연산자

`+` 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작한다.

다만 개발자의 의도와는 상관 없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다. 이를 암묵적 타입 변환 또는 강제 변환이라고 한다.

```jsx
1 + true // 2
1 + false // 1
1 + null // 1
1 + undefined // NaN
```

# 7.2. 할당 연산자

할당 연산자는 우하엥 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당한다. 할당 연산자는 좌항의 변수에 값을 할당하므로 변수 값이 변하는 부수 효과가 있다.

할당문은 값으로 평가되는 표현식인 문으로 할당된 값으로 표현된다.

```jsx
let a, b, c;
a = b = c = 0; // 연쇄 할당

function func() {
	let result = 0;
	return result = 1 + 2;
}

console.log(func()); // 3

```

# 7.3. 비교 연산자

비교 연산자는 좌항가 우항의 피연산자를 비교한 다음 그 결과를 불리언 값으로 반환한다.

## 7.3.1. 동등/일치 비교 연산자

동등 비교 연산자와 일치 비교 연산자는 좌항과 우항의 피연산자가 같은 값으로 평가되는지 비교해 불리언 값을 반환한다. 둘의 차이는 비교하는 엄격성의 정도가 다르다. 동등 비교 연산자는 느슨한 비교를 하지만 일치 비교 연산자는 엄격한 비교를 한다.

앞서 언급했듯 자바스크립트 코드는 개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다. 이를 암묵적 타입 변환이라 한다고 했다.

동등 비교연산자(`==`)는 좌항과 우항의 피연산자를 비교할 때 먼저 암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교한다. 따라서 동등 비교 연산자는 좌항과 우항의 피연산자가 타입은 달라도 암묵적 타입 변환 후 같은 값일 수 있다면 `true`를 반환한다.

다만 이 점때문에 동등 비교 연산자는 아래와 같이 예측하기 어려운 결과를 만들어낸다. 따라서 동등 비교 연산자는 사용하지 않는 편이 좋다. 대신 일치 비교 연산자(`===`)를 사용한다.

```jsx
console.log('0' == ''); //  false
console.log(0 == ''); //  true
console.log(0 == '0'); //  true
console.log(false == 'false'); //  false
console.log(false == '0'); //  true
console.log(false == null); //  false
console.log(false == undefined); //  false
```

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/859204e8-a754-4cf7-bc15-337b4fa7e433/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2fa693e-c3da-49c0-8088-2dd99b47e0ab/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/789ff196-5700-447f-b90e-c4e714813d10/Untitled.png)

위와 같이 일치비교 연산자는 좌항과 우항의 피연산자가 타입도 같고 값도 같은 경우 `true`를 반환한다. 즉 암묵적 타입 변환을 하지 않고 값을 비교한다.

다만 일치 비교 연산자에서 주의할 것은 `NaN`으로, `NaN`은 자신과 일치하지 않는 유일한 값이다. 따라서 숫자가 `NaN`인지 조사하려면 빌트인 함수 `Number.isNaN`을 사용한다.

```jsx
const isNotNumber = (number) => (number !== number);

console.log(isNotNumber(0)); // false
console.log(isNotNumber(1)); // false
console.log(isNotNumber(NaN)); // true
```

```jsx
console.log(Number.isNaN(0)); // false
console.log(Number.isNaN(1)); // false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(1+NaN)); // true
```

숫자 0도 주의하자. 자바스크립트에는 양의 0과 음의 0이 있는데 이들을 비교하면 `true`를 반환한다. 참고로 일치 비교/동등 비교 모두 `true`를 반환한다.

### Ref. Object.is 메서드

앞에서 살펴본 바와 같이 동등 비교 연산자와 일치 비교 연산자는 +0과 -0을 동일하다 평가하고, 또한 동일한 값인 `NaN`을 비교하면 다른 값이라 평가한다.

ES6에서 도입된 `Object.is` 메서드를 사용하면 더 정확한 비교 결과를 반환한다. 그 외에는 일치 비교 연산자와 동일하게 동작한다.

```jsx
-0 === +0; // true
Object.is(-0, +0); // false

NaN === NaN; // false
Object.is(NaN, NaN); // true
```

## 7.3.2. 대소 관계 비교 연산자.

대소 관계 비교 연산자는 피연산자의 크기를 비교하여 불리언 값을 반환한다.

# 7.4. 삼항 조건 연산자.

삼항 조건 연산자는 조건식의 평가 결과에 따라 반환할 값을 결정한다.

```jsx
조건식 ? 조건식이 true일 경우 반환할 값 : 조건식이 false일 경우 반환할 값
```

삼항 조건 연산자의 첫 번째 피연산자는 조건식이므로 삼항 조건 연산자 표현식은 조건문이다. 따라서 `if ... else` 문을 사용해도 유사하게 처리할 수 있다.

하지만 삼항 조건 연산자 표현식과 `if ... else` 문의 중요한 차이는, 삼항 조건 연산자 표현식은 값처럼 사용할 수 있지만, `if … else` 문은 표현식이 아닌 문이므로 값처럼 사용할 수 없다.

삼항 조건 연산자 표현식은 값으로 평가할 수 있는 표현식인 문으로, 삼항 조건 연산자 표현식은 값처럼 다른 표현식의 일부가 될 수 있어 매우 유용하다.

```jsx
const number = 10;
const reuslt = number % 2 ? 'odd' : 'even'
console.log(result); // even
```

# 7.5. 논리 연산자

논리 연산자는 우항과 좌항의 피연산자(부정 논리 연산자의 경우 우항의 피 연산자)를 논리 연산 한다.

논리 부정(`!`) 연산자는 언제나 불리언 값을 반환한다. 단, 피연산자가 반드시 불리언 값일 필요는 없다. 만약 피연산자가 불리언 값이 아니면 불리언 타입으로 암묵적 타입 변환한다.

논리합(`||`), 논리곱(`&&`) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다. 논리합(`||`) 또는 놀리곱(`&&`) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.

```jsx
console.log(true && 'here');
console.log(false && '<- logged false');
console.log(true || '<- logged true');
console.log(false || 'here');
```

### Ref. 드 모르간의 법칙

논리 연산자로 구성된 복잡한 표현식은 가독성이 좋지 않아 한눈에 이해하기 어려울 때가 있는데, 이때 드 모르간의 법칙을 활용하면 복잡한 표현식을 좀 더 가독성 좋은 표현식으로 변환할 수 있다.

```jsx
!(x || y) === (!x && !y)
!(x && y) === (!x || !y)
```

# 7.6. 쉼표 연산자

쉼표(`,`) 연산자는 왼쪽 피연산자부터 차례대로 피연산자를 평가하고 마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평가 결과를 반환한다.

# 7.7. 그룹 연산자

소괄호(`()`)로 피연산자를 감싸는 그룹 연산자는 자신의 피연산자인 표현식을 가장 먼저 평가한다. 즉 연산자의 우선순위를 조절할 수 있다.

```jsx
1.toString() // Uncaught SyntaxError: Invalid or unexpected token
(1).toString(); // '1'
1..toString(); // '1'
1 .toString(); // '1'
```

# 7.8. typeof 연산자

`typeof` 연산자는 피연산자의 데이터 타입을 문자열로 반환한다. 7가지 문자열 중 하나를 반환하며 `null`을 반환하는 경우는 없다. 함수의 경우 `function`을 반환한다. `typeof` 연산자가 반환하는 문자열은 7개의 데이터 타입과 정확히 일치하지는 않는다.

```jsx
typeof '' // "string"
typeof 1 // "number"
typeof NaN // "number"
typeof true // "boolean"
typeof undefined // "undefined"
typeof Symbol() // "symbol"
typeof null // "object"
typeof [] // "object"
typeof {} // "object"
typeof new Date() // "object"
typeof /test/gi // "object"
typeof function () {} // "function"
```

`typeof` 연산자로 `null` 값을 연산해 보면 `null`이 아닌 `object`를 반환하는데 주의해야한다. 이것은 자바스크립트의 첫 번째 버전의 버그로, 기존 코드에 영향을 줄 수 있기 때문에 아직까지 수정되지 못하고 있다.

값이 `null` 타입인지 확인할 때는 `typeof` 연산자 대신 일치 연산자를 사용하자.

또 하나 주의해야 할 것이, 선언하지 않은 식별자를 `typeof` 연산자로 연산해 보면 `ReferenceError` 에러를 발생하지 않고 `undefined`를 반환한다.

# 7.9. 지수 연산자

ES7에서 도입된 지수 연산자(`**`)는 좌항의 피연산자를 밑으로, 우항의 피연산자를 지수로 거듭 제곱하여 숫자 값을 반환한다.

지수 연산자가 도입되기 전에는 `Math.pow` 메서드를 사용했는데, 지수 연산자가 가독성이 좋은 편이다.

음수를 거듭제곱의 밑으로 사용해 계산하려면 괄호로 묶어야한다.

또한 다른 산술 산술 연산자와 마찬가지로 할당 연산자와 함께 사용할 수 있으며, 이항 연산사 중 우선순위가 가장 높다.

# 7.10. 그 외의 연산자

## 7.10.1. **Optional chaining**

옵셔널 체이닝 연산자(`?.`)는 좌항의 피연산자가 `null` 또는 `undefined` 일 경우 `undefined`를 반환하고, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

```jsx
// 
if (result.data && result.data.user && result.data.user.auth > 3) {
	...
}

//
if (result.data?.user?.auth > 3) {
	...
}
```

## 7.10.2. **Nullish coalescing**

`null` 병합 연산자는 좌항은 피연산자가 `null` 또는 `undefined`인 경우 우항의 피연산자를 반환하고, 그렇지 않으면 좌항의 피연산자를 반환한다. 변수에 기본값을 설정할 때 유용하다.

```jsx
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
```

### 7.10.2.1. **Logical nullish assignment**

```jsx
const coffee = {
	acidity: 'high',
	body: 'havy'
}

coffee.acidity ??= 'low';
console.log(coffe.acidity); // high

coffee.aroma ??= 'flower';
console.log(coffee.aroma); // flower
```

## 7.10.3. delete

`delete` 연산자는 객체의 프로퍼티를 삭제할 수 있다.

```jsx
const obj = { key: 'value' };
delete obj.key;
console.log(obj); // {}
```

## 7.10.4. new

`new` 연산자는 생성자 함수의 형식을 가진 함수와 함께 호출하면 객체(인스턴스)를 생성한다.

```jsx
function Person(name, age) {
	this.name = name;
	this.age = age;

	this.introduce = function () {
		return `name: ${name} / age: ${age}`;
	}
}

console.log(new Person(raehan, 30).introduce); // name: raehan / age: 30
```

## 7.10.5. instanceof

`instanceof` 연산자는 이항 연산자로 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받아, 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true로 아닌 경우 `false`로 평가된다.

## 7.10.6. in

객체 내에 특정 프로퍼티가 존재하는지 여부를 확인한다.

```jsx
const obj = {
	key: 'value';
}
key in obj // true
keys in obj //false
```

# 7.11. 연산자 부수 효과

대부분 연산자는 다른 코드에 영향을 주지 않는다. 하지만 할당 연산자(`=`), 증가/감소 연산자(`++`/`--`), `delete` 연산자는 다른 코드에 영향을 주는 부수 효과가 있다.

# 7.12. 연산자 우선순위

1. ()
2.  new(매개변수 존재), ., [](프로퍼티 접근), ()(함수 호출), ?.(옵셔널 체이닝 연산자)
3. new(매개변수 미존재)
4. x++, x--
5. !x, +x, -x, ++x, --x, typeof, delete
6. **(이항 연산자 중에서 우선순위가 가장 높다)
7. *, /, %
8. +, -
9. <, <=, >, >=, in, instanceof
10. ==, !=, ===, !==
11. ??(null 병합 연산자)
12. &&
13. ||
14. ? ... : …
15. 할당 연산자(=, +=, -=, …)
16. ,

# 7.13. 연산자 결합 순서

연산자 결합 순서랑 연산자의 어느 쪽부터 평가를 수행할 것인지 나타내는 순서를 말한다.

### 좌항 → 우항

+, -, /, %, <, <=, >, >=, &&, ||, ., [], (), ??, ?., in, instanceof

### 좌항 ← 우항

++, --, 할당 연산자(=, +=, -=, …), !x, +x, -x, ++x, --x, typeof, delete, ? ... : ..., **