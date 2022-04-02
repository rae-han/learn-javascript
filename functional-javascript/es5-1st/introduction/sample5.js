let { _map } = require('./_')
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
// 근데 키가 1,2,3,4 가 아니라 오브젝트인 경우?