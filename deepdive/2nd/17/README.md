# 17. 생성자 함수에 의한 객체 생성

# 17.1. Object 생성자 함수

`new` 연산자와 `Object` 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체를 생성한 이후 프로퍼티 또는 메서드를 추가할 수 있다.

```jsx
const person = new Object();

person.name = 'raehan';
person.sayHello = function () { console.log(`Hello, ${this.name}!`) }

person.sayHello();
```

생성자 함수란 `new` 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다. 생성자 함수에 의해 생성된 객체를 인스턴스라 한다.

사실 `Object` 생성자 함수를 사용해 객체를 생성하는 것은 명시적이지도 않고 생산성도 떨어져 유용해 보이진 않는다.

# 17.2. 생성자 함수

## 17.2.1. 객체 리터럴에 의한 객체 생성 방식의 문제점

객체 리터럴에 의한 객체 생성 방식은 직관적이고 간편하나, 단 하나의 객체만 생성하는 문제가 있다.

```jsx
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

const circle2 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle1.getDiameter(), circle2.getDiameter()); // 10 10
console.log(circle1.getDiameter === circle2.getDiameter); // false
```

## 17.2.2. 생성자 함수에 의한 객체 생성 방식의 장점

생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

```jsx
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

Circle.prototype.calcDiameter = function () {
  return 2 * this.radius;
}

const circle1 = new Circle(5);
const circle2 = new Circle(5);

console.log(circle1.getDiameter(), circle2.getDiameter()); // 10 10
console.log(circle1.getDiameter === circle2.getDiameter); // false
console.log(circle1.calcDiameter(), circle2.calcDiameter()); // 10 10
console.log(circle1.calcDiameter === circle2.calcDiameter); // true
```

<aside>
💡 **this**

`this`는 객체 자신의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수다. `this`가 가리키는값, 즉 `this` 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.

일반 함수로 호출 → 전역 객체
메서드로서 호출 → 메서드를 호출한 객체(아침표 앞의 객체)
생성자 함수로서 호출 → 생성자 함수가 생성할 인스턴스

```jsx
function normal() {
  console.log(this);
  this.log = function () { console.log(this) }
}

const object = {
  method1: function() {
    console.log(this)
  },
  method2() {
    console.log(this)
  }
};

const instance = new normal();

console.clear();
normal(); // window or global
object.method1(); // { method1: [Function: method1], method2: [Function: method2] }
object.method2(); // { method1: [Function: method1], method2: [Function: method2] }
instance.log(); // normal { log: [Function (anonymous)] }
```

</aside>

생성자 함수는 이름 그대로 객체(인스턴스)를 생성하는 함수다. 다만 다른 클래스 기반 객체지향 언어의 생성자와는 다르게 그 형식지 정해져 있는 것이 아니라 일반 함수와 동일한 방법으로 함수를 정의하고 new 연산자와 함께 호출하면 해다 함수는 생성자 함수로 동작한다.

## 17.2.3. 생성자 함수의 인스턴스 생성 과정

생성자 함수의 역할을 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여 인스턴스를 생성하는 것과 생성된 인스턴스를 초기화(인스턴스 프로퍼티 추가 및 초기값 할당)하는 것이다. 이 중 인스턴스를 생성하는 것은 필수이고, 초기화하는 것은 옵션이다.

생성자 함수 내부 코드를 보면 `this`에 필요한 프로퍼티를 추가하고 필요에 따라 전달된 인수를 프로퍼티의 초기값으로서 할당하여 인스턴스를 초기화한다. 하지만 코드상 인스턴스를 생성하고 반환하는 부분은 보이지 않는다.

이유는 자바스크립트 엔진에서 암묵적인 처리를 통해 인스턴스를 생성하고 반환하기 때문이다. `new` 연산자와 함께 생성자 함수를 호출하면 자바스크립트는 아래와 같은 과정을 거처 인스턴스를 생성하고 인스턴스를 초기화한 후 암묵적으로 인스턴스를 반환한다.

### 17.2.3.1. 인스턴스 생성과 this 바인딩

암묵적으로 빈 객체가 생성되는데, 이 빈 객체가 (아직 완성되지 않았지만) 생성자 함수가 생성한 인스턴스다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다. 생성자 함수 내부의 `this`가 생성자 함수가 생성할 인스턴스를 가리키는 이유이다. 이 처리는 함수 몸체의 코드가 한 줄씩 실행되는 런타임 이전에 실행된다.

<aside>
💡 바인딩
바인딩이란 식별자와 값을 연결하는 과정을 의미한다. 예를 들어 변수 선언은 변수 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것이다. this 바인딩은 this(키워드로 분류되지만 식별자 역할을 한다)와 this가 가리킬 객체를 바인딩하는 것이다.

</aside>

### 17.2.3.2. 인스턴스 초기화

생성자 함수에 기술되어 있는 코드가 한 줄씩 실행되어 this에 바인딩되어 있는 인스턴스를 초기화 한다. 즉 this에 바인딩 되어 있는 인스턴스에 프로퍼티나 메서드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다. 이 처리는 개발자가 기술한다.

### 17.2.3.3. 인스턴스 반환

생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 `this`가 암묵적으로 반환된다.

만약 `this`가 아닌 다른 객체를 명시적으로 반환하면 해당 객체가 반환된다. 하지만 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 `this`가 반환된다.

생성자 함수 내부에서 명시적으로 `this`가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본 동작을 훼손하므로, 생성자 함수 내부에서 `return` 문을 반드시 생략해야 한다.

## 17.2.4. 내부 메서드 [[Call]]과 [[Construct]]

생성자 함수로서 호출한다는 것은 `new` 연산자와 함께 호출하여 객체를 생성하는 것을 의미한다.

함수는 객체이므로 일반 객체와 동일하게 동작할 수 있는데, 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있기 때문이다.

하지만 일반 객체는 호출할 수 없지만 함수는 호출할 수 있다. 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드에, 함수로서 동작하기 위한 함수 객체만을 위한 `[[Evironment]]`, `[[FormalParameters]]` 등의 내부 슬롯과 `[[Call]]`, `[[Construct]]` 같은 내부 메서드를 추가로 가지고 있기 때문이다.

함수가 일반 함수로서 호출되면 함수 객체의 내부 메서드 `[[Call]]`이 호출되고 `new` 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 `[[Construct]]`가 호출된다.

내부 메서드 [[Call]]을 갖는 함수 객체를 callable이라 하며, 내부 메서드 [[Construct]]를 갖는 함수 객체를 constructor, 갖지 않는 함수 객체를 non-constructor라고 부른다. callable은 호출할 수 있는 객체인 함수를 말하며, constructor는 생성자 함수로서 호출할 수 있는 함수, non-constructor는 객체를 생성자 함수로서 호출할 수 없는 함수를 의미한다.

호출할 수 없는 객체는 함수 객체가 아니므로, 함수 객체는 callable이어야 한다. 따라서 모든 함수 객체는 내부 메서드 [[Call]]을 갖고 있으므로 호출할 수 있다.

하지만 모든 함수 객체가 [[Construct]]를 갖는 것은 아니고 constructor일수도 non-constructor일수도 있다.

즉 모든 함수 객체는 callable이고, constructor이거나 non-constructor이다.

![Untitled](https://github.com/rae-han/learn-javascript/blob/master/deepdive/2nd/17/img.png)

## 17.2.5. constructor와 non-contructor의 구분

자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때 함수 정의 방식에 따라 구분한다.

- constructor: 함수 선언문, 함수 표현식, 클래스(클래식도 함수다.)
- non-constructor: 메서드(ES6 메서드 축약 표현), 화살표 함수

생성자 함수로서 호출될 것을 기대하지 않고 정의한 일반 함수 또한 new 연산자를 붙여 호출하면 생성자 함수처럼 동작할 수 있으므로 주의해야 한다.

## 17.2.6. new 연산자

일반 함수와 생성자 함수에 특별한 형식적 차이는 없다. new 연산자와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작한다. 즉 new 연산자의 유무에 따라 [[Construct]] 내부 메서드가 호출될지 [[Call]] 내부 메서드가 호출될지 결정된다. 단 new 연산자와 함께 호출하는 함수는 constructor여야 한다.

일반 함수와 생성자 함수에 특별한 형식적 차이가 없으므로 생성자 함수는 일반적으로 첫 문자를 대문자로 기술하는 파스칼 케이스로 명명하여 일반 함수와 구별하도록 한다.

## 17.2.7. new.target

생성자 함수를 구분하기 위해 파스칼 케이스 컨벤션을 사용한다 하더라도 실수는 언제나 발생할 수 있다. 이런 위험성을 회피하기 위해 ES6(ES2015)부터 new.target을 지원한다.

new.target은 this와 유사하게 constructor인 모든 함수 내부에서 암묵적인 지역 변수와 같이 사용되며 메타 프로퍼티라고 부른다.

함수 내부에서 new.target을 사용하면 new 연산자와 함께 생성자 함수로서 호출되었는지 확인할 수 있다. new 연산자와 함께 생성자 함수로서 호출되면 함수 내부의 new.target은 함수 자신을 가리키고, new 연산자 없이 일반 함수로서 호출된 함수 내부의 new.target은 undefined다.

따라서 함수 내부에서 new.target을 사용하여 new 연산자와 생성자 함수로서 호출됐는지 확인하여, 그렇지 않은 경우 new 연산자와 함께 재귀 호출을 통해 생성자 함수로서 호출할 수 있다.

```jsx
function Circle(radius) {
  if (!new.target) {
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

<aside>
💡 스코프 세이프 생성자 패턴

```jsx
function Circle(radius) {
  if(!(this instanceof Circle)) {
    return new Circle(radius)
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고 this에 바인딩 하는데, this와 Circle은 프로토타입에 의해 연결된다.
만약 new 연산자와 호출되지 않았다면 조건문 시점의 this는 전역 객체를 가리킨다. 즉 this와 Circle이 프로토타입에 의해 연결되지 않는다.

</aside>

대부분의 빌트인 생성자 함수는 new 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환한다.

예를 들면 Object, Function 생성자 함수는 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작한다.

하지만 String, Number, Boolean 생성자 함수는 new 연산자와 함께 호출했을 때 각각의 객체를 생성하여 반환하지만, new 연산자 없이 호출하면 각각의 값을 반환한다. 이를 통해 데이터 타입을 변환하기도 한다.