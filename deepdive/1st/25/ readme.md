자바스크립트는 **프로타타입 기반**(prototype-based) 객체지향 언어다. 

ES5에서는 생성자 함수와 프로토타입, 클로저를 사용하여 객체 지향 언어의 상속, 캡슐화(정보 은닉) 등의 개념을 구현할 수 있다.

```jsx
let Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}`);
  }

  return Person;
}());

let me = new Person('Han');
me.sayHi();
console.log(me) // Person { name: 'Han' }
console.log(me.__proto__) // { sayHi: [Function (anonymous)] }
```

# 1. 자바스크립트에서 클래스란?

자바스크립트에서의 클래스는 클래스 기반 객체지향 프로그래밍에 익숙한 사람을 위한 새로운 객체 생성 메커니즘으로  프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용 가능하게 해준다.

### 객제 지향 언어의 두 가지 줄기

[객체 지향 언어의 두 가지 줄기](https://www.notion.so/af21063ecde94ee59d0fe5f4b3bcb738)

### 클래스와 생성자 함수의 공통점과 차이점

- 공통점
    - 프로토타입 기반의 인스턴스를 생성
- 차이점
    1. 클래스를 new 연산자 없이 호출하면 에러가 발생하지만 생성자 함수를 new 연산자 없이 호출하면 함수로서 호출된다.
    2. 클래스는 상속을 지원하는  extends와  super 키워드를 제공한다.
    3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작하지만 함수 선언문으로 정의된 생성자 함수는 함수 호이스팅이, 함수 표현식으로 정의한 생성자 함수는 변수 호이스팅이 발생한다.
    4. 클래스 내의 모든 코드에는 암묵적으로 strict mode가 지정되어 실행되며 해제할 수 없다. 생성자 함수는 지정되지 않는다.
    5. 클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모드 프로퍼티 어트리뷰트 [[Enumrable]]의 값이  false이다. 즉 열거되지 않는다.
    

클래스는 생성자 함수 기반의 객체 생성 방식보다 견고하고, 특히  extends와  super 키워드는 상속 관계 구현을 간결하고 명료하게 한다.

# 2. 클래스 정의

클래스는 class  키워드를 사용하여 정의한다. 네이밍은 생성자 함수와 마찬가지로 파스칼 케이스를 사용한다.

또한 일반적이진 않지만 함수와 마찬가지로 표현식으로 클래스를 정의할 수 있다.

```jsx
// 클래스 선언문
class Person {};

// 익명 클래스 표현식
const Person = class {};

//  기명 클래스 표현식
const Person = class MyClass {};
```

클래스를 표현식으로 정의할 수 있다는 것은 함수처럼 값으로 사용할 수 있는 일급 객체라는 것을 의미하고 아래와 같은 특징을 갖는다.(클래스는 함수다.)

1. 무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다.
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에게 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

# 3. 클래스 호이스팅

클래스는 함수로 평가된다.

```jsx
class Person {}

console.log(typeof Person); // function
```

클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 런타임 이전에 먼저 함수 객체를 생성한다. 이때 생성된 함수 객체는 생성자 함수로서 호출할 수 있는 함수(constructor)이고, 이 함수의 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.(프로토 타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재)

단, 클래스는 클래스 정의 이전에 참조할 수 없다.(let, const 키워드처럼 일시적 사각지대가 존재.)

```jsx
console.log(Person);
// ReferenceError: Cannot access 'Person' before initialization

class Person {}
```

```jsx
const Person = '';

{
  // 호이스팅이 발생하지 않는다면 ''이 출력되어야 한다.
  console.log(Person);

  class Person {}
}
```

# 4. 인스턴스 생성

클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성한다.

```jsx
class Person {}

const me = new Person();
console.log(me); // Person {}
```

클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 new 연산자와 함께 호출해야한다.

```jsx
class Person {}

const me = Person(); // TypeError: Class constructor Person cannot be invoked without 'new'
```

클래스 표현식으로 정의된 클래스의 경우 기명 함수 표현식과 같이 식별자를 사용해 인스턴스를 생성하지 않고 기명 클래스 표현식의 이름을 사용해 인스턴스를 생성하면 에러가 발생한다.

```jsx
const Person = class MyClass {};

const me = new Person();

console.log(MyClass); // MyClass is not defined

const you = new MyClass(); // MyClass is not defined
```

# 5. 메서드

클래스 몸체에는 0개 이상의 메서드만 선언할 수 있다. 클래서 몸체에서 정의할 수 있는 메서드는  constructor(생성자), 프로토타입 메서드, 정적 메서드 3가지 이다.

## 5.1.  constructor

constructor는 인스턴트를 생성하고 초기화하기 위한 특수한 메서드를 이름을 변경할 수 없다.

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }
}

// a
console.log(typeof Person); // function
console.log(Person.__proto__ === Function.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Person.prototype.constructor === Person) // true

const me = new Person('Han');
console.log(me);
console.log(me.name === 'Han');
```

클래스는 인스턴스를 생성하기 위한 생성자 함수다.

클래스는 평가되어 함수 객체가 되고, 함수 객체 고유의 프로퍼티를 모두 갖고 있으며, 함수와 동일하게 프로토타입과 연결되어 있고 자신의 스코프 체인을 구성한다.

모든 함수 객체가 가지고 있는 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor 프로퍼티는 클래스 자신을 가리키고 있다. 이는 클래스가 인스턴스를 생성하는 생성자 함수라는 것을 의미한다.

Person 클래스의  constructor 내부에서 this에 추가한 name 프로퍼티가 클래스가 생성한 인스턴스 me의 프로퍼티로 추가 됐다. 즉, 생성자 함수와 마찬가지로 construc 내부에서 this에 추가한 프로퍼티는 인스턴트 프로퍼티가 되고 constructor 내부의 this는 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가리킨다.

그러나 클래스가 생성한 인스턴스에서 constructor 메서드를 확인할 수 없다. constructor는 메서드로 해석되는 것이 아니라 클래스가 평가되어 생성한 함수 객체 코드의 일부가 된다. 다시 말해, 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성된다. ????

constructor는 생성자 함수와 유사하지만 몇 가지 차이가 있다.

1. constructor는 클래스 내에 최대 한 개만 존재 가능하다. 그 이상은 문법 에러가 발생한다.
2. constructor는 생략 가능하고, 생략시 빈 constructor가 암묵적으로 정의된다.
3. 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가한다.
4. 인스턴스를 생성할 때 클래스 외부에서 프로퍼티의 초기값을 전달하려면 constructor에 매개변수를 선언하고 인스턴스를 생성하면 초기 값이 constructor의 매개변수에 전달된다.(3, 4번의 이유로 인스턴스를 초기화 하려면 constructor를 생략해서는 안된다.)
5. constructor는 별도의 반환문을 갖지 않아야한다.
    - new 연산자와 클래스가 호출되면 암묵적으로 this, 즉 인스턴스를 반환하기 때문이다.
    - 만약 this가 아닌 다른 객체를 명시적으로 반환하면 인스턴스(this)가 반환되지 못하고 return 문에 명시한 객체가 반환된다.
    - 다만 객체가 아닌 원시값을 반환하면 무시되고 암묵적으로 this가 반환된다.
    

## 5.2. 프로토타입 메서드

생성자 함수를 사용하여 인스턴스를 생성하는 경우 프로토타입 메서드를 생성하기 위해서는 명시적으로 프로토타입에 메서드를 추가해야 한다.

하지만 클래스는 이와 다르게 몸체에서 정의한 메서드는 prototype 프로퍼티에 추가하지 않아도 기본적으로 프로토타입 메서드가 된다.

```jsx
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee
```

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}

const me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee

// me 객체의 프로토타입은 Person.prototype이다.
console.log(Object.getPrototypeOf(me) === Person.prototype); // true
console.log(me.__proto__ === Person.prototype) // true
console.log(me instanceof Person); // true

// Person.prototype의 프로토타입은 Object.prototype이다.
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
console.log(me instanceof Object); // true

// me 객체의 constructor는 Person 클래스다.
console.log(me.constructor === Person); // true
```

생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다.

결국 클래스는 생성자 함수와 같이 인스턴스를 생성하는 생성자 함수라 볼 수 있다. 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 메커니즘이다.

## 5.3. 정적 메서드

정적 메서드는 인스턴스를 생성하지 않아도 호출할수 있는 메서드이다.

생성자 함수의 경우 명시적으로 생성자 함수에 메서드를 추가하고, 클래스에서는 메서드에 static  키워드를 붇이면 정적 메서드(클래스 메서드)가 된다.

```jsx
function Person(name) {
  this.name = name;
}

Person.sayHi = function () {
  console.log('Hi!');
};

Person.sayHi(); // Hi!
```

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }

  static sayHi() {
    console.log('Hi!');
  }
}

Person.sayHi(); // Hi!

const me = new Person('Han');
me.sayHi(); // TypeError: me.sayHi is not a function
```

정적 메서드는 클래스가 바인딩 된다. 클래스는 함수 객체로 평가되고 객체는 자신의 프로퍼티, 메서드를 소유 가능하다. 클래스는 클래스 정의가 평가되는 시점에 함수 객체가 되므로 인스턴스와 달리 별다른 생성 과정이 필요 없고 클래스 정의 이후 클래스로 호출 가능하다.

정적 메서드는 인스턴트로 호출할 수 없다. 정적 메서드가 바인딩된 클래스는 인스턴스 프로토타입 체인 상에 존재하지 않기 때문이다.

## 프로토타입 메서드와 정적 메서드의 프로토타입 체인

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ed4b698-69ad-44ee-af86-4339d8faefdf/Untitled.png)

## 5.4.  정적 메서드와 프로토타입 메서드의 차이

1. 정적 메서드와 프로토타입 메서드는 자신이 속해있는 프로토타입 체인이 다르다.
2. 정적 메서드는 클래스로 호출하고 프로토타입 메서드는 인스턴스로 호출한다.
3. 정적 메서드는 인스턴트 프로퍼티를 참조할 수 없지만 프로토타입 메서드는 인스턴트 프로퍼티를 참조할 수 있다.
    - 프로토타입 메서드의 this는 클래스로 생성한 인스턴스 객체를 가리킨다.
    - 정적 메서드의 this는 인스턴스가 아닌 클래스를 가리킨다.
    

메서드 내부에서 인스턴스 프로퍼티를 참조해야 한다면 this 를 사용해야하고 프로토타입 메서드로 정의해야한다. this를 사용하지 않더라도 프로토타입 메서드로 정의할 수 있지만 반드시 인스턴스를 생성한 다음 인스턴스로 호출해야 하므로 this를 사용하지 않는 메서드는 정적 메서드로 정의하는 것이 좋다.

표준 빌트인 객체(Math, Number, JSON, Object...)는 다양한 정적 메서드를 가지고 있는데, 이들은 애플리케이션 전역에서 사용할 유틸리티 함수이다.

클래스 또는 생성자 함수를 하나의 네임스페이스로 사용하여 정적 메서드를 모아 놓으면 이름 충돌 가능성을 줄여주고 관련 함수들을 구조화할 수 있는 효과가 있다. 이런 이유로 정적 메서드는 애플리케이션 전역에서 사용할 유틸리티 함수를 전역 함수로 정의하지 않고 메서드로 구조화할 때 유용하다.

## 5.5. 클래스에서 정의한 메서드의 특징

1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마가 필요 없다.
3. 암묵적으로 strict mode로 실행된다.
4. for ... in 문이나 Object.keys 메서드 등으로 열거할 수 없다. 즉 프로퍼티의 열거 가능 여부를 나타내며, 불리언 값을 갖는 프로퍼티 어트리뷰트 [[Enumerable]] 값이 false다.
5. 내부 메서드 [[Construct]]를 갖지 않는 non-constructor다. 따라서 new 연산자와 함께 호출할 수 없다. ????

# 6. 클래스의 인스턴스 생성 과정

클래스는 new 연산자와 반드시 함께 호출해야 하고, 호출하면 생성자 함수와 마찬가지로 클래스의 내부 메서드 [[Construct]]가 호출된다.

1. 인스턴스 생성과 this 바인딩
    
    new 연산자와 함께 클래스를 호출하면 암묵적으로 빈 객체가 생성되는데 이 객체가 (완성되지 않은) 클래스가 생성한 인스턴스다.
    
    클래스가 생성한 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티가 가리키는 객체가 설정되고, 앞서 암묵적으로 생성한 빈 객체인 인스턴스는 this에 바인딩된다. 따라서 constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.
    
2. 인스턴스 초기화
    
    constructor의 내부 코드가 실행되어 this에 바인되어 있는 인스턴스를 초기화한다. 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화한다. constructor가 생략 되었다면 이 과정도 생략된다.
    
3. 인스턴스 반환
    
    클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this를 암묵적으로 반환한다.
    

```jsx
class Person {
  // 생성자
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }
}
```

# 7. 프로퍼티

## 7.1 인스턴스 프로퍼티

인스턴스 프로퍼티는 constructor 내부에서 정의해야 한다.

constructor 내부에서 this에 추가한 프로퍼티는 언제나 클래스가 생성한 인스턴스의 프로퍼티가 된다. ES6의 클래스는다른 객체지향 언어처럼 접근 제한자를 지원하지 않으므로 기본적으로 프로퍼티는 public하다.

## 7.2. 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티이다.

클래스에서도 사용할수 있는데 getter와 setter 메서드 이름 앞에 각각 get, set 키워드를 사용해 정의해준다.

```jsx
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const me = new Person('Ungmo', 'Lee');

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(`${me.firstName} ${me.lastName}`); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
me.fullName = 'Heegun Lee';
console.log(me); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(me.fullName); // Heegun Lee

console.log(me.getName()); // Heegun Lee

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

이때 getter와 setter 이름은 인스턴스 프로퍼티처럼 사용된다. 호출하는 것이 아니라 참조하는 형식으로 사용한다.

getter는 반드시 반환 값이 있어야하고 setter는 하나의 매개 변수만 선언 가능하다.

클래스의 메서드는 기본적으로 프로토타입 메서드가 된다. 클래스의 접근자 프로퍼티 또한 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 된다.

## 7.3. 클래스 필드 정의 제안

클래스 필드(또는 맴버)는 클래스 기반 객체지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리키는 용어이다.

자바스크립트 클래스는 자바의 클래스와는 다르게 몸체에 메서드만 선언 가능하다. 따라서 클래스 몸체에 자바와 유사하게 클래스 필드를 선언하면 문법 에러가 발생한다.

```jsx
class Person {
  // 클래스 필드 정의
  name = 'Han';
}

const me = new Person('Lee');
```

하지만 위 코드를 최신 브라우저(Chrome 72이상), Node.js 12 버전 이상에서 실행하면 문법 에러가 발생하지 않고 정상 동작한다.

그 이유는 자바스크립트에서도 인스턴스 프로퍼티를 마치 클래스 기반 객체지향 언어의 클래스 필드처럼 정의할 수 있는 새로운 표준 사양인 "Class field declarations"이 TC39 프로세스의 stage3(candidate)에 제안되어 있다.

클래스 몸체에서 클래스 필드를 정의하는 경우 this에 클래스 필드를 바인딩해서는 안된다. this는 클래스의  constructor와 메서드 내에서만 유효하다.

클래스 필드를 참조하는 경우 자바와 같은 클래스 기반 객체지향 언어에서는 this를 생략할 수 있으니 자바스크립트에서는 this를 반드시 사용해야 한다.(클래스 필드가 생성자 또는 메서드의 매개변수 이름과 동일할 때 클래스 필드임을 명확히 하기 위하 사용한다.)

클래스 필드에 초기값을 할당하지 않으면 undefined를 갖는다.

인스턴스를 생성할 때 외부의 초기값으로 클래스 필드를 초기화 해야한다면 constructor에서 클래스 필드를 초기화 해야한다. 또한 클래스 필드를 초기화할 필요가 있을때 어차피 constructor 내부에서 클래스 필드를 참조하여 초기값을 this, 즉 클래스가 생성한 인스턴스의 클래스 필드에 프로퍼티가 자동 추가되기 때문에 따로 클래스 필드를 정의할 필요가 없다.

함수는 일급 객체이므로 함수를 클래스 필드에 할당할 수 있다. 이 함수는 프로토타입 메서드가 아닌 인스턴스 메서드가 되는데 모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문이다. 따라서 클래스 필드에 함수를 할당하는 것은 권장하지 않는다.

```jsx
class Person {
  // 클래스 필드에 문자열을 할당
  name = 'Lee';

  // 클래스 필드에 함수를 할당
  getName = () => this.name;

  gettetName() {
    return this.name
  }
}

const me = new Person();
console.log(me); // Person {name: "Lee", getName: ƒ}
console.log(me.getName()); // Lee
console.log(me.gettetName()); // Lee

console.log(me) // Person { name: 'Lee', getName: [Function: getName] }
```

정리하면 인스턴스 프로퍼티를 정의하느 방식은 두 가지가 있다. 인스턴스를 생성할 때 외부 초기값으로 클래스 필드를 초기화할 필요가 있다면  constructor에서 인스턴스를 정의하는 기존 방식을 사용하고, 그게 아니라면 기존의 방식과 클래스 필드 정의 제안 모두 사용할 수 있다.

## 7.4. private 필드 정의 제안

자바스크립트는 캡슐화를 완전하게 지원하지 않는다. ES6의 클래스도 생성자 함수와 마찬가지로 private, public, protected 키워드 같은 접근 제한자를 지원하지 않는다. 따라서 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다(public하다).

다만 TC39 프로세스의 stage 3에는 private 필드를 정의할 수 있는 표준 사양이 제언되어 있다.

pritvate 필드의 선두에 #을 붙여 줌으로 정의 할수 있고 참조 시에도 #을 붙여줘야 한다.

```jsx
class Person {
  // private 필드 정의
  #name = '';

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }
}

const me = new Person('Lee');

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);
// SyntaxError: Private field '#name' must be declared in an enclosing class
```