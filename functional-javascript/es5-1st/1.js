var _ = require('./partial'); // https://github.com/marpple/partial.js/blob/master/partial.js
var { L } = _;

// 지연 평가
//  지연 평가를 시작 시키고 유지 시키는(이어 가는) 함수
// 1. map
// 2. filter, reject

// 끝을 내는 함수
// 1. take
// 2. some, every, find

var i = 0;
var mi = 0;
var fi = 0;

_.go(
  _.range(100),
  _.map(function(val) {
    ++i; ++mi;
    return val*val;
  }),
  _.filter(function(val) {
    ++i; ++fi;
    return val%2;
  }),
  _.take(5), // 이 전에 배열이 50개다.
  console.log,
)

console.log(i, mi, fi); // filter 함수 전에 mi는 100이다.

var i = 0;
var mi = 0;
var fi = 0;

_.go(
  _.range(100),
  L.map(function(val) {
    ++i; ++mi;
    return val*val; 
  }),
  L.filter(function(val) {
    ++i; ++fi;
    return val%2;
  }),
  L.take(5), // 이 전에 배열이 50개다.
  console.log,
)

console.log(i, mi, fi); // 여기선 필요한 만큼만 실행 됐다. 

// 순수 함수를 조합한 함수형 프로그래밍이라 가능하다.
// 시점에 상관 없이 항상 동일한 결과를 만들 수 있기 때문이다.

// 첫번째 코드가 엄격한 평가
// 두번째 코드가 지연 평가
// 엄격한 평가는 모든 데이터를 평가하며 함수를 하나하나 넘어간다면
// 지연 평가는 한 값 하나하나 함수를 통과시킨다.

var i = 0;
var mi = 0;
var fi = 0;

_.go(
  _.range(100),
  L.map(function(val) {
    ++i; ++mi;
    return val*val;
  }),
  L.filter(function(val) {
    ++i; ++fi;
    return val%2;
  }),
  L.some(function(val) {
    return val > 100;
  }),
  console.log,
)

console.log(i, mi, fi); // 여기선 필요한 만큼만 실행 됐다. 

// 함수형 자바스크립트 요약
// 1. 함수를 되도록 작게 만들기
// 2. 다형성 높은 함수 만들기
// 3. 상태를 변경하지 않거나 정확히 다루어 부수 효과를 최소화 하기(부수 효과가 없을순 없다. 특히 자바스크립트에서는 더 심하다.) 
//   - 또는 부수효과가 없다가 마지막에서 값을 바꾼다던지 부수효과가 발생한다. 맨 마지막에 목적 또는 결과로 부수효과를 일으킨다.
//   - 하지만 그 과정에서 부수효과를 일이키진 않는다.
// 4. 동일한 인자를 받으면 항상 동일한 결과를 리턴하는 순수 함수 만들기
// 5. 복잡한 객체 하나를 인자로 사용하기보다 되도록 일반적인 값 여러 개를 인자로 사용하기
// 6. 큰 로직을 고차 함수로 만들고 세부 로직을 보조 함수로 완성하기
// 7. 어느곳에서든 바로 혹은 미뤄서 실행할 수 있도록 일반 함수이자 순수 함수로 선언하기
// 8. 모델이나 컬렉션 등의 커스텀 객체보다는 기본 객체를 이용하기
// 9. 로직의 흐름을 최대한 단방향으로 흐르게 하기
// 10. 작은 함수를 조합하여 큰 함수 만들기

// -> 함수형 프로그래밍을 통해 데이터 흐름 프로그래밍을 확인할 수 있다. (go 함수에 데이터와 함수들을 열거함으로)

// 지연평가 + 병렬성 + 동시성
// 순수함수가 있기 때문에 가능한 함수형 아이디어
// 어느시점에서 평가하든 상관이 없기 때문에 지연평가가 가능
// 동시에 다른 스레드에서 평가해도 상관 없고 어느 곳에서든 어느 시점에서 평가하든 상관이 없기 때문에 병렬성, 동시성에 좋다.

// 리듀스에 의해 함수가 4개 실행 된다면
// (((a+b)+c)+d) 로 실행되자만
// ((a+b)+(c+d)) 도 같은 결과가 나오며 이걸 fold 라고 한다. 접어가는 함수라 생각하면 된다.
// fold 같은 경우 (a+b) 와 (c+d) 를 다른 스레드에서 처리하고 다시 두 값을 처리해도 같은 결과를 나타난다

클로저 같은 경우 함수가 나열돼 있을때 맨 윗 함수를 먼저 실행시키면서 데이터를 가공하는게 아니라 최대한 지연 시키면서 함수 전체를 평가한 후 프로그램의 전체 성능을 튜닝해준다.
만약 앞에 map, filter같은 함수가 있고 마지막에 fold 함수가 있다면 fold 함수를 통해 먼저 각 데이터를 스레드에 배분하고 앞에 있는 평가된 전체 함수를 실행시켜준다.

// 비동기 I/O NodeJS




