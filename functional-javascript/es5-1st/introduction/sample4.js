let { _each, _filter, _map } = require('./_');

_each(null, console.log);
// each 함수 내부에서 length를 참조하고자 할때 리스트가 null이라 에러가 난다.
// 앞서 만든 get 함수가 null 값이면 undefined를 반환한다. 어떻게 보면 null체크를 하고 있다.
// _each 에 list.length 대신 undefined  가 들어가면 에러가 나지 않는다.
// a
// 수정하면 map, filter 함수 역시 에러가 나지 않는다.
console.log(
  _filter(null, v => v),
  _map(null, v => v),
)
// 빈배열


// 함수형 프로그래밍에서 함수 연속 실행 할때 언제 어디서 잘못된 값이 들어와도 특별이 에러가 나지 않고 흘려 보낼수 있는 전략을 취한다.
// 이런 기법은 언더스코어, 로다쉬에도 채택하고 있다.
// 데이터 형을 체크한다던가, trycatch를 묶어준다던가 하는 작업이 줄어든다.



console.log(Object.keys({ name: 'ID', age: 33 }));
console.log(Object.keys([1, 2, 3, 4]));
console.log(Object.keys(10));
// console.log(Object.keys(null)); // 에러

function _is_object(obj) {
  return typeof obj == 'object' && !!obj;
}
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}


console.log(_keys({ name: 'ID', age: 33 }));
console.log(_keys([1, 2, 3, 4]));
console.log(_keys(10));
console.log(_keys(null)); // 에러
// 이런 식으로 함수형 프로그래밍에서는 그럴싸한 값을 리턴하는 식으로 어떤 형태의 값이 들어오던지 다형성을 높여서 그럴듯한 값을 리턴하는 식으로
// 연속적인 함수 실행에 무리가 없도록 한다

// 위 코드를 이용하면 each 함수의 다형성을 높일 수 있다.

_each({
  13: 'AB',
  19: 'CD',
  29: 'YD',
}, name => console.log(name))
// length 가 없으므로 아무런 일도 안일어난다.

// b
// _each ㅎ나 수정하면 맵 필터 모드 정상 동작 가능하다.
console.log(_map({
  13: 'AB',
  19: 'CD',
  29: 'YD',
}, name => name.toLowerCase()))
// 다형성을 극대화 시켜 형에 대해 자유롭다.
// 어떤 데이터가 들어올지 개발자가 알기 때문에 보조 함수를 통해서 처리하게 위임한다.
