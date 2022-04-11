var _ = require('./partial');
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
