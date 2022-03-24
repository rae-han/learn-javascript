let { _reduce, _map, _rest, _filter, _get, _log_length, users, _curryr } = require('./_')

// _pipe
// 함수를 인자로 받아서 함수를 연속적으로 실행시켜주는 함수.
// 함수만 인자로 받는 함수
// 결국엔 reduce이다.
// pipe가 좀 더 추상화 된 레벨이 pipe이고 pipe는 좀 더 특화된 함수이다.
// 함수들 이라는 배열을 통해서 인자를 연속적으로 적용한 최종 결과로 축약
// function _pipe() {
//   const fns = arguments;
//   console.log(fns)

//   return function(arg) {
//     return _reduce(fns, function(arg, fn) {
//       console.log(fn)
//       return fn(arg)
//     }, arg)
//   }
// }

const _pipe = (...fns) => arg => _reduce(fns, (arg, fn) => fn(arg), arg);

const fn = _pipe(
  n => n + 1,
  n => n * 2,
  n => n * n,
);

console.log(fn(1));

_pipe(
  users => _filter(users, user => user.age >= 30),
  users => _map(users, _get('name')),
  console.log,
)(users)
_pipe(
  users => _filter(users, user => user.age < 30),
  users => _map(users, _get('age')),
  console.log,
)(users)

// _go(
//   users,
//   _filter((user) => user.age >= 30),
//   _map(_get('name')),
//   console.log,
// )
// _go(
//   users,
//   _filter((user) => user.age < 30),
//   _map(_get('age')),
//   console.log,
// )

// _go
// 즉시 실행되는 pipe 함수
// pipe 는 함수를 리턴하는 함수
// go는 첫번째 값을 인자로 두번째 값부터 함수를 받아서 즉시 실행시키는 함수


// function _go(arg) {
//   let fns = _rest(arguments);
//   // pipeline을 만들 때,
//   // pipeline은 인자 들로 함수를 받기 때문에 aplly를 통해 인자를 받는다.
//   return _pipe.apply(null, fns)(arg);
//   // return _pipe(...fns)(arg);
// }

const _go = (arg, ...fns) => _pipe(...fns)(arg);

_go(
  1,
  n => n + 1,
  n => n * 2,
  n => n * n,
  console.log,
)

// 1. 2. 30세 이상인 users의 names를 수집한다.
console.log(_log_length(
	_map(
		_filter(users, user => user.age >= 30), 
		_get('name')
	),
));

// 3. 4. 30세 미만인 users의 ages를 수집한다.
console.log(_log_length(
	_map(
		_filter(users, user => user.age < 30), 
		_get('age')
	),
));

// 기존 함수는 함수 안쪽부터 시작해서 밖으로 전개가 되니 사람이 읽기가 불편한 점이 있다.

_go(
  users,
  function(users) {
    return _filter(users, function(user) {
      return user.age >= 30;
    });
  },
  function(users) {
    return _map(users, _get('name'));
  },
  console.log,
)

_go(
  users,
  function(users) {
    return _filter(users, function(user) {
      return user.age < 30;
    });
  },
  function(users) {
    return _map(users, _get('age'));
  },
  console.log,
)

// 위 함수 패턴을 보면 users를 받아서 안쪽 함수에서 다시 user를 받고 그 안에서 데이터를 리턴하고
// 안쪽 함수는 항상 보조 함수가 있는 형태이다.
// curryr을 사용하면 간결하게 바꿀 수 있다.

// _map, filter에 curryr을 적용하면?
_map = _curryr(_map);
_filter = _curryr(_filter);

const numbers = [1, 2, 3, 4];
const callbackFunc = num => num*num;

console.log(
  _map(numbers, callbackFunc),
  _map(callbackFunc)(numbers), 
  // 2개 모두 같은 값을 가리킨다
)

// 평가 순서를 다르게 갈 수 있다.
// 그렇다면 위에 코드를 바꿀 수 있다.
// 훨씬 갈결하고 체인패턴(메소드 체이닝)과 비슷한 정도의 표현력을 보여준다.
_go(
  users,
  _filter(function(user) {
      return user.age >= 30;
  }),
  _map(_get('name')),
  console.log,
)

_go(
  users,
  _filter(function(user) {
      return user.age < 30;
  }),
  _map(_get('age')),
  console.log,
)

_go(
  users,
  _filter((user) => user.age >= 30),
  _map(_get('name')),
  console.log,
)

_go(
  users,
  _filter((user) => user.age < 30),
  _map(_get('age')),
  console.log,
)

// _pipe와 _go 함수를 사용하면 기존의 함수를 중첩 하는 것보다 훨씬 명시적으로 코드를 읽어 나갈수 있다.

// 커리와 파이프 함수가 필터 맵 함수를 만들때 커리알을 이용해서 만들었고
// 그로 인해 그 함수가 인자를 하나, 함수 하나만 넘겼을 때 인자가 오른쪽부터 적용된 또 다른 함수를 리턴하게 되고
// 고라는 함수로 인자와 함수들을 받아서 함수를 연속적으로 실행 시키면서 인자를 변화시키면서 함수형 프로그래밍
// 함수의 평가시점이나 함수가 인자에 적용 되 가는 과정에서 사이드 이펙트가 없는 순수 함수들로 구성될 때 이런 조합성을 만들수 있다

// 순수 함수의 평가 시점을 다루면서 조합성을 다루면서 추상화의 단위를 함수로 하는 프로그래밍




// const sampleList = [
//   { id: 1, data: 'sample1' },
//   { id: 2, data: 'sample2' },
//   { id: 3, data: 'sample3' },
//   { id: 4, data: 'sample4' },
// ]

// const _each = (list, iteratee) => {
// 	for(let i = 0; i < list.length; i++) {
// 		iteratee(list[i]);
// 	}
// }

// const _filter = (list, predicate) => {
// 	let new_list = [];

// 	_each(list, value => {
// 		if(predicate(value)) {
// 			new_list.push(value)
// 		}
// 	});
// }

// const _map = (list, mapper) => {
//   let new_list = [];

//   _each(list, value => {
// 		new_list.push(mapper(value));
// 	})

//   return new_list;
// }

// const _reduce = (list, iter, memo) => {
//   if(memo == undefined) {
//     memo = list[0];
//     list = _rest(list);
//   }

//   _each(list, function(val) {
//     memo = iter(memo, val)
//   })

//   return memo;
// }

// const _pipe = (...fns) => arg => _reduce(fns, (arg, fn) => fn(arg), arg);

// const fn = _pipe(
//   _filter,
//   _map,
// )

// fn(sampleList);
