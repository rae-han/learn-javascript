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

const _each = (list, iteratee) => {
	for(let i = 0; i < list.length; i++) {
		iteratee(list[i]);
	}
}

const _curryr = fn => (a, b) => b !== undefined ? fn(a, b) : (b => fn(b, a));
// function _curryr(fn) {
//   return function(a, b) {
//     return arguments.length === 2 ? fn(a, b) : function(b) {
//       return fn(b, a); // 미리 받은 함수 본체를 안쪽에서 평가
//     }
//   }
// }
// const _curryr = fn => {
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

  _each(list, value => {
		new_list.push(mapper(value));
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

const _log_length = value => {
	return value;
}

const _curry = (fn) => (a, b) => arguments.length === 2 ? fn(a, b) : b => fn(a, b);
// function _curry(fn) {
//   return function(a) {
//     return function(b) {
//       return fn(a, b); // 미리 받은 함수 본체를 안쪽에서 평가
//     }
//   }
// }
// const _curryr = fn => (a, b) => arguments.length === 2 ? fn(a, b) : b => fn(b, a);

// let _get = (obj, key) => obj === null ? undefined : obj[key];
const _get = _curryr((obj, key) => obj === null ? undefined : obj[key]);;

// const _reduce = (list, iteratee, memo) => {
// 	_each(list, value => {
// 		memo = iteratee(memo, value)
// 	})

// 	return memo;
// }
const _reduce = (list, iter, memo) => {
  // 003
  if(memo == undefined) {
    console.log(list)
    memo = list[0];
    // list = list.slice(1); // slice는 Array 메서드기 때문에 list가 어레이일때만 사용 가능하다
    // let slice = Array.prototype.slice;
    // slice.call(list, 2); // 이렇게 하면 array like 객체에서도 사용 가능하다
    // console.log(slice.call(a, 2).constructor);
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

module.exports = {
  users,
  _filter,
  _map,
  _each,
  _get,
  _reduce,
  _rest,
  _log_length,
  _curry,
  _curryr,
}

// 여기서부터 그냥 002로 이동

