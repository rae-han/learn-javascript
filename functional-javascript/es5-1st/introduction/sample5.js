let { _each, _keys, _map, _get, _filter, _curryr, _reduce, _pipe, _go } = require('./_')
// 컬렉션 중심 프로그래밍
// 배열이나 돌림직한 것들을 컬렉션이라한다.
// 컬렉션 중심 프로그래밍은 함수형에서 더 빛을 발한다.
// 컬렉션을 잘 다루는 함수 세트를 구성하는 식으로 프로그래밍 하는걸 컬렉션 중심 프로그래밍이라 한다.
// 맵 필터 리듀스 가은 함수들이 있다.
// 크게 4가지 유형으로 나뉜다.
// 1. 수집하기 - map, values, pluck...
// 2. 거르기 - filter, reject, compact, without...
// 3. 찾아내기 - find, some, every...
// 4. 접기(축약) - reduce, min, max, group_by, count_by...
// 맨 앞에 4개가 가장 추상화 돼 있는 함수이고 그걸 이용해서 뒤에 있는 특화된 함수들을 만들 수 있다.

let users = [
  { id: 10, name: 'ID', age: 36 },
  { id: 20, name: 'BJ', age: 32 },
  { id: 30, name: 'JM', age: 32 },
  { id: 40, name: 'PJ', age: 27 },
  { id: 50, name: 'HA', age: 25 },
  { id: 60, name: 'JE', age: 26 },
  { id: 70, name: 'JI', age: 31 },
  { id: 80, name: 'MP', age: 23 },
  { id: 90, name: 'FP', age: 13 }
];


// 1. 수집하기 - map

// values
// 들어있는 값과 동일한 값을 꺼내는 함수
// 배열을 이용해 values를 사용할땐 사실 큰 의미가 없다.
// 근데 키가 0,1,2,3,4 가 아니라 오브젝트인 경우?

// function _values(data) {
//   return _map(data, function(val) { 
//     return val; 
//   });
// }
var _values = _map(_identity);
console.log(11, _keys(users[0]));
// _each 함수를 돌 때 키 값을 사용해서 돌도록 만든 함수
console.log(1, _values(users));
console.log(2, _values(users[0]));
_each(users[0], console.log)

// values는 재밌는 함수인 아이덴티티를 합성해서 함수를 만들수 있다.
// 아이덴티티 함수는 
function _identity(val) {
  return val;
}

var a = 10;
console.log(_identity(a));
// a를 그냥 10으로 리턴해준다.
// 이런 함수가 왜 필요할까?
// 자세히 보면 이 함수는 value를 만들기 위해 맵 함수의 매퍼 보조함수로 사용된 익명함수와 하는 일이 동일하다.
// 그래서 identity로 대체하면 된다.

// function _values(data) {
//   return _map(data, _identity);
// }

// map을 curryr 로 변경해 놨기 때문에 더 간단히 구현 가능하다.
// 맵 함수는 첫번째 인자로 함수만 받는다면 함수를 리턴하게 된다.
// 그 함수는 앞으로 들어올 데이터를 받을 준비를 하는 함수가 된다.
// 그래서 아래 함수는 _value와 동일한 역할을 하는 함수가 된다.
console.log(_map(_identity)(users[0]));
// 평가 순서를 뒤집은 함수이다.

// var _values = _map(_identity); // 호이스팅 안되서 위로 올렸음.
// _identity를 통해서 위와 같이 사용 가능하다.


// 2. pluck
// pluck 는 배열 내부에 있는 개체의 특정 키의 값들을 수집하는 함수이다.
// 외부의 값을 수집한다? map
// function _pluck(data, key) {
//   return _map(data, function(obj) {
//     return obj[key];
//   })
// };

console.clear();
console.log('######## ######## ######## ########  ######## ######## ######## ########')
console.log(22, _pluck(users, 'age'))
// 플럭크를 사용하면 간결하게 값들을 수집할 수 있다.

// get 함수를 통해 간결하게 만들 수 있다.
function _pluck(data, key) {
  return _map(data, _get(key))
};

// # 2. filter
// reject는 필터를 반대로 동작 시킨 것

console.log(_filter(users, function(user) {
  return user.age > 30;
}))

console.log(_filter(users, function(user) {
  return !(user.age > 30);
}))

function _reject(data, predi) {
  return _filter(data, function(val) {
    return !predi(val);
  })
}

console.log(_reject(users, function(user) {
  return user.age > 30;
}))
// 필터 함수를 사용하여 조건을 바꿔도 되지만 
// 리젝트를 통해서 프레디 케이트는 그대로 둔 상태에서 앞에 있는 고차 함수의 이름(filter -> reject)를 바꿔서
// 좀 더 선언적으로 프로그래밍 할 수 있다

function _negate(func) {
  return function(val) {
    return !func(val);
  }
}
// 결과적으로 reject의 
// function(val) {
//   return !predi(val);
// }
// 와
// function(val) {
//   return !func(val);
// }
// 의 코드가 같다.
// 저런 일을 하는 함수를 쉽게 만들 수 있다.

function _reject(data, predi) {
  return _filter(data, _negate(predi));
}
// 함수 중첩만 남았다. 함수형 프로그래밍 스럽다.
var _reject = _curryr(_reject);

// compact 함수
// true한 값만 남기는 것

var _compact = _filter(_identity); // identity 함수 자체가 값을 나타내기 때문에 이 자체로도 true, false 필터가 가능하다.
// 이 있는거 자체를 나타내는 identity 함수는 별볼일 없어보이지만 굉장히 간결하고 강력하게 사용 가능하다
// 다양하고 서로 다른 함수들을 셋하면 유리하다
// 굉장이 큰 하나의 클래스를 만드는 것보다 여러개의 함수를 만드는 것이 함수형 프로그래밍 스럽다

console.clear();
console.log('######## ######## ######## ########  ######## ######## ######## ########')

console.log(_compact([0, 1, 2, null, false, {}]))



// # 찾아내기
// find는 컬렉션에서 처음으로 일치하는 값을 리턴하는 함수 find_index는 index를 리턴
// 필터함수와 비슷한데 필터는 모든 값을 검색하며 걸러내는 거라면 파인드는 돌다가 값 하나만 찾자마자 리턴하는 함수
// 원하는 값을 얻게 되면 더 이상 로직을 실행하지 않는 최적화의 키워드가 될 수 있다.
// each로 만들면 된다.
function _find(list, predi) {
  var keys = _keys(list);

  for(var i = 0, len = keys.length; i < len; i++) {
    // if(predi(list[keys[i]])) return list[keys[i]];
    // 겹치는 것 변수로 처리
    var val = list[keys[i]];
    if(predi(val)) return val;

    // 만약 일치하는 조건을 만나면 리턴 
    // 아니라면 undefined
  }
}

var _find = _curryr(_find);

console.log(_find(users, function(user) {
  return user.age < 30;
}));

console.log(_find(users, function(user) {
  return user.id === 30;
}));

console.clear();
console.log('######## ######## ######## ########  ######## ######## ######## ########')

function _find_index(list, predi) {
  var keys = _keys(list);

  for(var i = 0, len = keys.length; i < len; i++) {
    if(predi(list[keys[i]])) return i;

    // 만약 일치하는 조건을 만나면 리턴 
    // 아니라면 undefined
  }

  return -1;
}

var _find_index = _curryr(_find_index)

console.log(_find_index(users, function(user) {
  return user.age < 30;
}));

console.log(_find_index(users, function(user) {
  return user.id === 30;
}));
console.log(_find_index(users, function(user) {
  return user.id === 35;
}));

// 1
console.log(
  _get(_find(users, function(user) {
    return user.id === 50;  
  }), 'name')
)

// functional
_go(
  users,
  _find(function(user) { // 사용 전에 반드시 curryr 형태로 만들어줘야 한다.
    return user.id === 50
  }),
  _get('name'),
  console.log,
)
_go(
  users,
  _find_index(function(user) { // 사용 전에 반드시 curryr 형태로 만들어줘야 한다.
    return user.id === 50
  }),
  console.log,
)
// 원래 코드보다 훨씬 이해하기 쉽다.

// some and every
// some 은 어떠 값이 하나라도 있는지 확인하고 불리언 값으로
// every 는 모든 값이 조건을 만족 하는지 확인하고 불리언 값으로

// 1
// function _some(data, predi) {
//   return _find_index(data, predi) !== -1;
// } 

// function _every(data, predi) {
//   return _find_index(data, _negate(predi)) === -1; 
// }

// var testcase1 = [1, 2, 4, 6, 8, 9, 11, 17, 19];

// console.log(_some(testcase1, function(val) {
//   return val === 11;
// }))

// console.log(_every(testcase1, function(val) {
//   return val < 20;
// }))

console.clear();
console.log('######## ######## ######## ########  ######## ######## ######## ########')

console.log('#### 2')
// some과 every는 predicate가 생갹 되도 동작해야한다.
// 값 자체만으로 평가 받을수 있어야한다.
var testcase2 = [1, 0, false, null, undefined];
var testcase3 = [0, false, null, undefined];
var testcase4 = [1, true, {}, []]

console.log(
  _some(testcase2, _identity)
)
console.log(
  _some(testcase3, _identity)
)
// some에 predi가 없을때를 대비하면 된다.
function _some(data, predi) {
  return _find_index(data, predi || _identity) !== -1;
} 
function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) === -1; 
}
// 들어온 값을 그대로 리턴하는 함수가 아주 실용적으로 쓰이고 있다.

console.log(
  _every(testcase3)
)
console.log(
  _every(testcase4)
)

console.log(
  _some(users, function(user) {
    return user.age < 20;
  })
)
console.log(
  _every(users, function(user) {
    return user.age > 10;
  })
)

// 이런식으로 사용한다.
// 섬 파인드 파인드 인덱스 등 모두 고차함수로 사용되고 보조 함수를 받기 때문에
// 이 안에 모두 참인가 이런 함수보다 보조 함수를 받기 때문에 더 많은 일을 할수 있다.
// 일반적인 indexof 같은 경우 완전이 값이 같은지 래퍼런스 비교를 통해서만 해당하는 값이 몇번째 인덱스인지 찾을수 있다면
// 파인드 익덱스는 보조함수를 받아서 그 함수 상황을 만족하는 값이 있는지 없는지 있다면 몇번째인지 찾을수 있기 때문에
// 앞에 있는 고차 함수를 고르고 보조함수를 래핑하면서 프로그래밍 하는 것이 내가 로직을 고르는 것과 같다. 로직을 조합해 나가면서 프로그래밍 해나가는 것이다.
// 모두 그런지, 하나라도 그런지를 고차함수로 선택하고, 그러하느냐가 무엇인지를 보조함수로 선택하는 것이 함수형 프로그래밍이다.

console.clear();
console.log('######## ######## ######## ########  ######## ######## ######## ########')

// reduce 접기 or 축약
// 리듀스는 함수형 프로그래밍에서 굉장히 상징적인 함수이다
// 리듀스는 어레이 안에 있는 값이나 이터레이블한 객체의 값들을 통해서 다른 접혀진 값을 만들기 위해 사용
// 집계, 머지병합, 전혀 다른 값을 만들기 위해 사용하기도 한다.
// 순차적인 for문 관점에서 리듀스를 사용하기보다 함수형적인 측면에서 바라보는게 좋다.
// 순수 함수로서, 평가 순서 상관 없이 접어나가는 접거나 축약해나가는 것으로 함수를 이용하는 것이 중요하다.

// 컬렉션 중심 프로그래밍 중 접기 축약 에 중점을 두고 일단 바라본다.

// _min, _max
var testcase5 = [-10, -1, 0, 2, 3, 4, 5];

function _min(data) {
  return _reduce(data, function(a, b) {
    return a > b ? b : a;
  });
}
// 함수형 프로그래밍에서 평가 순서와 관계 없이 해당하는 결과를 만드는 식으로 사고하는 것이 좋다.
// 즉 위에 테스트 케이스가 순서대로 들어오지 않는다고 생각하고 프로그래밍 하는 것이 좋다.
// 즉 a,b가 들어왔을때 무슨 일을 할까? 에 중점을 둬야한다.
// 리듀스 자체를 for로 생각하고 프로그래밍 하는 것을 지양해야한다.

console.log(_min(testcase5));

function _max(data) {
  return _reduce(data, function(a, b) {
    return a > b ? a : b;
  });
}

console.log(_max(testcase5));

// min by max by 어떤 조건을 통해 비교를 할 것인가 추가적으로 이터레이터를 받는다.
// 민 멕스는 값을 직접 비교하여 다형성이 낮다.
// 바이 함수드릉ㄴ 보조 함수를 받기 때문에 어떤 것을 가지고 가능성을 열어두기 때문에 더 많은 것들을 할 수 있다.
function _min_by(data, iter) {
  return _reduce(data, function(a, b) {
    return iter(a) > iter(b) ? b : a;
  })
};

console.log(_min_by(testcase5, Math.abs));

function _max_by(data, iter) {
  return _reduce(data, function(a, b) {
    return iter(a) > iter(b) ? a : b;
  })
};

console.log(_max_by(testcase5, Math.abs));

// 만약 map 함수를 통해 데이터를 변경 후 비교를 하게 되면 맥스 바이를 할대 -10이 아닌 10이 나오게 된다.
// 함수적 아이디어를 통해 더 정교하게 프로그래밍을 할수 있다.
// 다형성과 확장성을 높인다.
// 숫자형 데이터가 아니더라도 실무적인 데이터를 가지고 사용 가능하다.

console.log(
  _max_by(users, function(user) { // users 의 이름을 가지고 비교하겠다 라는 뜻
    return user.age
  })
)

var _min_by = _curryr(_min_by);
var _max_by = _curryr(_max_by);

console.log('#### 4')
// 표현력을 올린다.
_go (
  users,
  _filter(user => user.age >= 30),
  _min_by(function(user) {
    return user.age
  }),
  console.log,
)

_go (
  users,
  _filter(user => user.age >= 30),
  _min_by(user => user.age),
  console.log,
)

_go (
  users,
  _filter(user => user.age >= 30),
  _min_by(_get('age')),
  console.log,
)

_go (
  users,
  _reject(user => user.age >= 30),
  _max_by(_get('age')),
  _get('name'),
  console.log,
)

// group_by
// 특정 값을 통해서 그룹화 시키는 것
// 접기에 특화된 함수

// function _group_by(data, iter) {
//   return _reduce(data, function(grouped, val) {
//     var key = iter(val);
//     (grouped[key] = grouped[key] || []).push(val);
//     return grouped;
//   }, {});
// };

var _group_by = _curryr(_group_by);

console.log(
  _group_by(users, function(user) {
    return user.age;
  })
)

_go(
  users,
  _group_by(function(user) { return user.age }),
  console.log,
)

console.clear();
console.log('######## ######## ######## ########  ######## ######## ######## ########')

// 그룹 바이 함수 안의 리듀스 안에 구현된 코드를 모듈화 하면 좋다.
// 왜냐면 저 로직 자체로 의미가 있기 때문이다.
// 객체와 키를 넣고 그 키로 찾아진 값이 있으면 그 곳에 푸쉬를 하고 그게 아니면 빈 어레이를 만들어서 푸쉬를 하는
// 안정성을 높여서 푸쉬를 하는 함수라 생각하면 된다.

// push는 직접 값을 변경하는 함수
function _push(obj, key, val) { 
  (obj[key] = obj[key] || []).push(val);
  return obj;
}

// 위 코드를 쓰면 더 간결해진다.
// 왜 더 간결해지나면 두번의 사용을 위해서 변수에 담아두는 일을 하는데
// 함수를 쪼개서 만들게 되면 변수 선언이 줄어드게 되는 경향을 보이다.
// 

function _group_by(data, iter) {
  return _reduce(data, function(grouped, val) {
    return _push(grouped, iter(val), val)
  }, {});
};
// 함수 실행의 연속을 통해서 로직을 만들어 나가는게 보인다.
// 함수를 통해 어던 값을 통해 그룹핑을 할 것인가 위임을 하게 된다.
_go(
  users,
  _group_by(function(user) { return user.age - user.age % 10 }), // 몇대인지 변형된 함수를 줘서 
  console.log,
)

_go(
  users,
  _group_by(function(user) { return user.name[0] }), // 
  console.log,
)
// 위 코드는 함수형 적인 아이디어로 아래와 같이 바꿀순 있다. 필수는 아니다.
var _head = function(list) {
  return list[0]
};

_go(
  users,
  _group_by(_pipe(_get('name'), _head)),
  console.log,
)
// 이런 식으로 작은 로직도 함수의 연속 실해응ㄹ 통해서 만들어 간다.

// count_by
// 그룹 바이와 비슷하지만 이터레이티로 만들어낸 키가 몇개가 있는지 만드는 함수
// push등의 행위를 할 필요가 없으므로 더 간결하다

// function _count_by(data, iter) {
//   return _reduce(data, function(count, val) {
//     var key = iter(val);
//     // count[ket] = count[key] ? count[key]++ : 1;
//     count[key] ? count[key]++ : count[key] = 1;
//     return count;
//   }, {})
// }
var _count_by = _curryr(_count_by);

console.log(
  _count_by(users, function(user) {
    return user.age - user.age%10;
  })
);

// 위의 _push와 같은 성격의 함수
function _inc(count, key) {
  count[key] ? count[key]++ : count[key] = 1;
  return count;
}

function _count_by(data, iter) {
  return _reduce(data, function(count, val) {
    return _inc(count, iter(val))
  }, {})
}

console.clear();
console.log('######## ######## ######## ########  ######## ######## ######## ########')

// each, map 함수를 조금 거친다.
// #11, #12
// 고치는 이유는 키 벨류 쌍을 한번에 볼수 있게 하기 위하여
_map([1, 2, 3], console.log);
_map(users[0], console.log);

console.log(
  _map(users[0], function(val, key) {
    return [key, val];
  })
)

// var _pairs = _map(function(val, key) {
//   return [key, val];
// })
var _pairs = _map((val, key) => [key, val]);

console.log(_pairs(users[0]))


// 바로 실행 시키려면 _go함수 사용해본다 그리고 앞에 인자를 받아서..
// pipe는 저 어래 2개 실행시키기 위해서 바꿔준 것
var f1 = _pipe(
  _count_by(function(user) { return user.age - user.age % 10; }),
  _map((count, key) => `<li>${key}대는 ${count}명 입니다.</li>`),
  list => '<ul>' + list.join('') + '</ul>',
  // document.write); // this가 있어야 동작한다 이거 동작 안한다
  // document.write(html)
  // document.write.bind(document)
  // html => document.wirte(html)
  );

_go(users, _reject(user => user.age < 20), f1); // f1 함수 내부에서 첫번째 줄에 필터링을 해도 된다.
_go(users, _filter(user => user.age < 20), f1);

console.log('#20')
var f2 = _pipe(_reject(user => user.age < 20), f1);
console.log(f2(users));

// module.exports = {
//   _values,
//   _pluck,
//   _negate,
//   _reject,
//   _compact,
//   _find,
//   _find_index,
//   _some,
//   _every,
//   _min,
//   _max,
//   _min_by,
//   _max_by,
//   _group_by,
//   _push,
//   _head,
//   _count_by,
//   _inc,
//   _pairs,
// }




