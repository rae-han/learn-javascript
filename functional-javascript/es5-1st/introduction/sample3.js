const { _reduce } = require('./_')

// _pipe
// 함수를 인자로 받아서 함수를 연속적으로 실행시켜주는 함수.
// 함수만 인자로 받는 함수
// 결국엔 reduce이다.
// pipe가 좀 더 추상화 된 레벨이 pipe이고 pipe는 좀 더 특화된 함수이다.
// 함수들 이라는 배열을 통해서 인자를 연속적으로 적용한 최종 결과로 축약
function _pipe() {
  const fns = arguments;
  console.log(fns)
  
  return function(arg) {
    return _reduce(fns, function(arg, fn) {
      return fn(arg)
    }, arg)
  }
}

// const _pipe = () => {

// }

const fn = _pipe(
  n => n + 1,
  n => n * 2
);

console.log(fn(1));