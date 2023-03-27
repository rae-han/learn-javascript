// 화살표 함수는 익명 함수로만 사용할 수 있다.
// 따라서 화살표 함수를 호출하기 위해서는 함수 표현식을 사용한다.
// 또는 콜백 함수로 사용할 수 있다.

// # 화살표 함수의 this
// 일반 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정되는 것이 아닌,
// 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정된다.
// 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다.
// 동적으로 결정되는 일반 함수와는 달리 화살표 함수의 this는 언제나 상위 스코프의 this를 가리킨다.
// 이를 Lexical this라 한다.
// 화살표 함수의 this 바인딩 객체 결정 방식은 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프와 유사하다.

function Prefixer(prefix) {
  this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function (arr) {
  // this는 상위 스코프인 prefixArray 메소드 내의 this를 가리킨다.
  return arr.map(x => `${this.prefix}  ${x}`);
};

const pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));

// 화살표 함수는 call, apply, bind 메소드로 this를 변경할 수 없다.

// ## 화살표 함수를 사용해서는 안되는 경우
// 화살표 함수는 렉시컬 this를 지원하므로 콜백 함수로 사용하기 편리하다.
// 이런 일반 함수와의 차이로 오히려 혼란을 불러오는 경우가 있으니 주의해야 한다.

// ### 1 메소드
// 화살표 함수로 메소드를 정의하는 것은 피해야 한다.

const person = {
  name: 'Lee',
  sayHi: () => console.log(`Hi, ${this.name}`),
}

person.sayHi(); // Hi, undefined
// 위 예제의 경우, 메소드로 정의한 화살표 함수 내부의 this는 메소드를 소유한 객체, 즉 메소드를 호출한 객체를 가리키지 않고
// 상위 컨택스트인 전역 객체 window를 가리킨다.
// 따라서 화살표 함수로 메소드를 정의하는 것은 바람직하지 않다.
// 이와 같은 경우는 메소드를 위한 단축 표기법인 ES의 축약 메소드 표현을 사용하는 것이 좋다.

const human = {
  name: 'Lee',
  sayHi() { // === sayHi: function() { ...
    console.log(`Hi ${this.name}`)
  }
};

human.sayHi(); // Hi, Lee

// ### 2 prototype
// 화살표 함수로 정의된 메소드를 prototype에 할당하는 경우도 동일한 문제가 발생한다.

const student = {
  name: 'James',
}

Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);
Object.prototype.sayHello = function() { console.log(`Hi ${this.name}`) };

student.sayHi(); // Hi undefined
student.sayHello(); // Hi James

// 화살표 함수로 객체의 메소드를 정의하였을 때와 같은 문제가 발생하므로, prototype에 메소드를 할당하는 경우
// 일반 함수를 할당한다.

// ### 3 생성자 함수
// 화살표 함수는 생성자 함수로 사용할 수 없다. 생성자 함수는 prototype 프로퍼티를 가지며
// prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor를 사용한다.
// 하지만 화살표 함수는 prototype 프로퍼티를 가지고 있지 않다.

const Test = () => {};

console.log(Test.hasOwnProperty('prototype')) // false

// const test = new Test(); // TypeError: Test is not a constructor

// ### 4 addEventListener 함수의 콜백 함수
// addEventListener 함수의 콜백 함수를 화살표 함수로 정의하면 this가 상위 컨택스트인 전역 객체 window를 가리킨다.
// 일반 함수로 정의된 콜백 함수 내부의 this는 이벤트 리스너에 바인딩된 요소(currentTarget)를 가리킨다.
