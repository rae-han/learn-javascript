// # 함수형 프로그래밍

// ### 성공적인 프로그래밍 
// - 모든 프로그래밍 패러다임은 성공적인 프로그래밍을 위해 존재하며, 성공적인 프로그래밍은 좋은 프로그램을 만드는 일이다.
// - 좋은 프로그램은 사용성, 성능, 확장성, 기획 변경에 대한 대응력 등이 좋다.
// - 이것들을 효율적이고 생산적으로이루는 일이 성공적인 프로그래밍이다.

// ### 함수형 프로그래밍
// - 함수형 프로그래밍은 좋은 프로그램을 위해 부수 효과를 지양하고 조합성을 강조하는 프로그래밍 패러다임이다.
//   - 부수 효과를 미워한다 -> 순수 함수를 만든다.
//   - 조합성을 강조한다 -> 모듈화 수준을 높인다.
//   - 순수 함수 -> 오류를 줄이고 안정성을 높인다.
//   - 모듈화 수준이 높다 -> 생산성을 높인다.

const add1 = (a, b) => {
  return a+b;
}
/**
 * # add1 함수는 순수 함수
 * - 항상 동일한 인자에 동일한 결과가 나온다
 * - 부수효과가 없다
 */

let c = 10;
const add2 = (a, b) => {
  return a + b + c;
}
/**
 * - add2 함수는 c값이 변하면 a, b 인자가 같더라도 결과 값이 달라질 수 있다
 * - 다만 c 값이 상수 값으로 고정돼 있다면 add2 함수도 순수함수이다
 */
const add3 = (a, b) => {
  c = b;
  return a + b;
}
/**
 * - return 값으로 소통하는 것 외에 외부 상태에 영향을 미친다면 부수효과가 있고 순수함수가 아니게 된다.
 * - 함수 실행 전후로 c의 상태가 달라진다.
 */

let obj1 = { val: 10 };
const add4 = (obj, b) => {
  obj1.val += b;
}
/**
 * - 이 함수는 순수 함수가 아니다
 * - 리턴 값도 없다
 * - 인자로 들어온 값의 상태를 직접 변경하는 함수이다
 * ! 이렇게 코딩하는 것이 문제라는 것이 아니라 이 함수는 순수 함수가 아닐 뿐이다
 * * 함수형 프로그래밍에서는 객체의 값을 원래 있던 값은 두고 새로운 값을 만들어서 원하는 부분에 새로운 값을 대치시킴으로 변경한다.
 */

const add5 = (obj, b) => {
  return ({
    val: obj.val + b
  })
}
let obj2 = add5(obj1, 20);
/**
 * * 함수형 프로그래밍에서는 값을 변형해나가거나 값을 다룰때
 * * 원래 초기 값에 변화를 주지 않으면서, 모든 값들에 변화를 일이키지 않고
 * * 외부의 상태를 변화시키지 않으면서
 * * 인자로 받은 값을 직접 변화시키지 않으면서 프로그램을 만들어나가는 프로그래밍이다.
 */

/**
 * * 순수 함수는 평가 시점이 중요하지 않다
 * * 언제 실행 됐냐가 중요하지 않고 항상 같은 값을 리턴시킨다.
 * - 순수 함수가 아닌 함수보다 강력한 조합성을 갖는다 
 * - 안전하고 다루기 쉬운 함수가 된다
 */

/**
 * # 일급 함수
 * - 자바스크립트에서는 함수가 일급 함수이다
 * - 함수를 값으로 다룰수 있으므로, 변수에 담을수 있고 변수에 담을수 있으므로, 다른 함수에 인자로 넘길수도 있고, 넘긴 함수를 실행시킬수도 있다
 * - 함수를 런타임에서 값으로 다룰수 있다
 */

/**
 * # 일급 객체
 * 
 * ! 정의
 * + 일급객체란 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체
 * 
 * ! 조건
 * - 변수에 할당(assignment)할 수 있다.
 * - 다른 함수를 인자(argument)로 전달 받는다.
 * - 다른 함수의 결과로서 리턴될 수 있다.
 * 
 * ! 일급 객체이기 때문에 할 수 있는 것
 * - 고차함수를 만들 수 있다
 * - 콜백을 사용할 수 있다
 */

const addMaker = (a) => {
  return function(b) { // 클로저
    return a + b; // 함수 내부에서만  a를 사용하며, a 값을 변경시키지 않는다. 참조만 할뿐 변경을 하지 않기 때문에 이 함수는 항상 동일한 값을 가리키고 있는 a와 함께 b를 더하는 순수 함수가 된다.
  }
};
const add10 = addMaker(10);
console.log(add10(20)); // add10은 언제 평가해도 항상 동일한 값을 리턴시킨다

const f4 = (f1, f2, f3) => {
  return f3(f1() + f2());
}

const result1 = f4(
  () => 2,
  () => 1,
  n => n*n
);
console.log(result1)
/**
 * 함수형 프로그래밍 패러다임은 위와 같은 형태를 띄게 된다
 * 함수가 함수를 인자로 받아서
 * 그 함수의 로직대로 원하는 시점에 평가하고 
 * 원하는 인자를 받아둔 함수에게 적용하면서 로직을 완성해 나가는 것
 * 
 * 순수 함수들을 만들어서 순수 함수들을 조합하여 큰 로직을 만들어가는 프로그래밍
 * 비동기나 동시성이 일어나는 시점에서 원하는 시점에 평가를 다룬다던가? 
 */

// 요즘 성공적인 프로그래밍을 하려면 어떻게 해야할까?
/**
 * 1. 재미, 실시간성 - 라이브 방송, 실시간 댓글, 협업, 메신저
 * 2. 독창성, 완성도 - 애니메이션, 무한 스크롤, 사진 잡아서 던지기 등
 * 3. 더 많아져야하는 동시성 - 비동기 I/O, CSP, Actor, STM...
 * 4. 더 빨라져야하는 반응성, 고가용성 - ELB, Auto Scaling, OPT Supervisor ...
 * 5. 대용량, 정확성, 병렬성 - MapReduce, Clojure Reducers ...
 * 6. 복잡도, MSA - 많아지고 세밀해지는 도구들 (도구를 하나만 쓰는게 아니라 작은 도구를 여러개 모아서 쓴다.)
 */
// 스멀스멀 다가오는 Functional Programming
/**
 * 좋아지는 하드웨어 성능
 * 좋아지는 컴파일러
 * 함수형 프로그래밍 기술
 * 좋아지는 분산 / 리액티브 환경
 * 동시성 + 병렬성 관련 기술
 */

/**
 * 함수형 프로그래밍은 애플리케이션, 함수의 구성요소, 더 나아가서 언어 자체를 함수처럼 여기도록 만들고, 이러한 함수 개념을 가장 우선순위에 놓는다
 * 
 * 함수형 사고방식은 문제의 해결 방법을 동사(함수)들로 구성(조합)하는 것  - 마이클 포커스
 */

/**
단순히 객체가 먼저 나오면 객체 지향 함수가 먼저 나오면 함수 지향 프로그래밍이다

person.moveLeft();
person.moveRight();
man.moveLeft();
man.moveRight();
-> 객체지향에서는 데이터를 먼저 디자인하고 그 데이터에 맞는 메서드를 만든다

moveLeft(person);
moveRight(person);
moveLeft(man);
moveRight({ x: 5, y: 2 });
-> 함수를 먼저 만들고, 그 함수에 맞게 데이터 세트를 구성한다
 */

