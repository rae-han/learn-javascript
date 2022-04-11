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

console.log(i, mi, fi); // filter 함수 전에 mi는 100이다.


