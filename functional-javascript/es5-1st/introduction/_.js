let users = [
  { id: 1, name: 'ID', age: 36 },
  { id: 2, name: 'BJ', age: 32 },
  { id: 3, name: 'JM', age: 32 },
  { id: 4, name: 'PJ', age: 27 },
  { id: 5, name: 'HA', age: 25 },
  { id: 6, name: 'JE', age: 26 },
  { id: 7, name: 'JI', age: 31 },
  { id: 8, name: 'MP', age: 23 }
];
let _curryr = fn => (a, b) => b !== undefined ? fn(a, b) : (b => fn(b, a));
let _get = _curryr((obj, key) => obj === null ? undefined : obj[key]);

// a
let _length = _get('length')
// let _each = (list, iteratee) => {
// 	// for(let i = 0; i < list.length; i++) {
// 	for(let i = 0, len = _length(list); i < len; i++) {
// 		iteratee(list[i]);
// 	}
// }

// b
function _is_object(obj) {
  return typeof obj == 'object' && !!obj;
}
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

let _each = (list, iteratee) => {
	let keys = _keys(list) // keys 자체는 null 값이 와도 빈 배열을 뱉도록 준비돼 있다. 무조건 올바른 배열이 리턴되므로 length를 사용할 수 있다.
	for(let i = 0, len = keys.length; i < len; i++) {
		// iteratee(list[keys[i]]);
		iteratee(list[keys[i]], keys[i]); // #11 key 혹은 i값도 넘겨 준다.
	}
}


// function _curryr(fn) {
//   return function(a, b) {
//     return arguments.length === 2 ? fn(a, b) : function(b) {
//       return fn(b, a); // 미리 받은 함수 본체를 안쪽에서 평가
//     }
//   }
// }
// let _curryr = fn => {
//   return (a, b) => {
//     console.log(1111)
//     console.log(a, b)
//     return b !== undefined ? fn(a, b) : b => fn(b, a)
//   }
// }

let _filter = (list, predicate) => {
	let new_list = [];

	_each(list, value => {
		if(predicate(value)) {
			new_list.push(value)
		}
	});

	return new_list;
}
// function _filter(list, predi) {
//   let new_list = [];
//   console.log('predi', predi)

//   _each(list, function(val) {
//     if(predi(val)) {
//       new_list.push(val)
//     }
//   });

//   return new_list; // 이거 주석 처리하면 이상한 에러가?
// }
_filter = _curryr(_filter);

let _map = (list, mapper) => {
  let new_list = [];

  _each(list, (value, key) => {
		new_list.push(mapper(value, key)); // #12
	})

  return new_list;
}
// function _map(list, mapper) {
//   let new_list = [];

//   _each(list, function(val) {
//     new_list.push(mapper(val));
//   })

//   return new_list;
// }
_map = _curryr(_map);

let _log_length = value => {
	return value;
}

let _curry = (fn) => (a, b) => arguments.length === 2 ? fn(a, b) : b => fn(a, b);
// function _curry(fn) {
//   return function(a) {
//     return function(b) {
//       return fn(a, b); // 미리 받은 함수 본체를 안쪽에서 평가
//     }
//   }
// }
// let _curryr = fn => (a, b) => arguments.length === 2 ? fn(a, b) : b => fn(b, a);

// let _get = (obj, key) => obj === null ? undefined : obj[key];


// let _reduce = (list, iteratee, memo) => {
// 	_each(list, value => {
// 		memo = iteratee(memo, value)
// 	})

// 	return memo;
// }
let _reduce = (list, iter, memo) => {
  // 003
  if(memo == undefined) {
    // console.log(list)
    memo = list[0];
    // list = list.slice(1); // slice는 Array 메서드기 때문에 list가 어레이일때만 사용 가능하다
    // let slice = Array.prototype.slice;
    // slice.call(list, 2); // 이렇게 하면 array like 객체에서도 사용 가능하다
    // console.log(slice.call(a, 2).letructor);
    list = _rest(list);
  }

  _each(list, function(val) {
    memo = iter(memo, val)
  })

  return memo;
}

let slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1)
}

let _pipe = (...fns) => arg => _reduce(fns, (arg, fn) => fn(arg), arg);
let _go = (arg, ...fns) => _pipe(...fns)(arg);

var {
  _values,
  _pluck,
  _negate,
  _reject,
  _compact,
  _find,
  _find_index,
  _some,
  _every,
  _min,
  _max,
  _min_by,
  _max_by,
  _group_by,
  _push,
  _head,
  _count_by,
  _inc,
  _pairs,
} = require('./sample5.js')

module.exports = {
  users,
  _filter,
  _map,
  _each,
  _keys,
  _get,
  _reduce,
  _rest,
  _log_length,
  _curry,
  _curryr,
  _pipe,
  _go,
  //
  _values,
  _pluck,
  _negate,
  _reject,
  _compact,
  _find,
  _find_index,
  _some,
  _every,
  _min,
  _max,
  _min_by,
  _max_by,
  _group_by,
  _push,
  _head,
  _count_by,
  _inc,
  _pairs,
}
// 여기서부터 그냥 002로 이동
