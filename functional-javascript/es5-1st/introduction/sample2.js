const { _filter, _map, _each, _get } = require('./_');

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

// # 1. 명령형 코드
// * 1. 30세 이상인 users를 거른다.
let temp_users1 = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users1.push(users[i]);
  }
}
// console.log(temp_users1);

// * 2. 30세 이상인 users의 names를 수집한다.
let names = [];
for (let i = 0; i < temp_users1.length; i++) {
  names.push(temp_users1[i].name);
}
// console.log(names);

// * 3. 30세 미만인 users를 거른다.
let temp_users2 = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) { // ! 1, 3 코드에서 중복을 줄이려고해도 이 부분을 없애는게 난해하다
    temp_users2.push(users[i]);
  }
}
// console.log(temp_users2);

// * 4. 30세 미만인 users의 ages를 수집한다.
let ages = [];
for (let i = 0; i < temp_users2.length; i++) {
  ages.push(temp_users2[i].age);
}
// console.log(ages);

// const _filter = (list, predi) => {
//   let new_list = [];

//   for(let i = 0; i<list.length; i++) {
//     // 함수형은 중복을 제거하거나 추상화할 때 함수를 사용한다
//     // 추상화의 단위가 객체, 클래스, 메소드가 아니라 함수를 이용하는 것
//     if(predi(list[i])) { 
//       // 어떤 조건일때 if문 안으로 들어올지를 predi 함수에게 위임한다
//       // 이렇게 함수를 인자로 받아서 원하는 시점에 해당하는 함수가 알고있는 인자를 적용하는 것이 응용형 프로그래밍, 응용형 함수, 적용형 프로그래밍이라 한다.
//       // 함수를 인자로 받거나, 받은 함수를 실행하거나, 함수를 리턴하는 걸 고차함수라 한다.
//       new_list.push(list[i]);

//     }
//   }

//   return new_list; // console.log 는 외부에 영향을 준다?
// }

console.log(_filter(users, user => user.age >= 30))
console.log(_filter(users, user => user.age < 30))
console.log(_filter([1, 2, 3, 4], num => num%2));
console.log(_filter([1, 2, 3, 4], num => !(num%2)));

// const _map = (list, mapper) => {
//   let new_list = [];

//   for(let i = 0; i < list.length; i++) {
//     new_list.push(mapper(list[i]));
//   }
//   /**
//    * mapper 함수에게 어떤 데이터를 수집할지 완전히 위임한다
//    * 데이터형이 어떻게 생겼는지 보이지 않는다 -> 함수형 프로그래밍의 중요한 특징중 하나
//    * 관심사가 완전비 불리된다
//    */

//   return new_list;
// }

const over_30 = _filter(users, user => user.age >= 30);
let over_30_names = _map(over_30, user => user.name);
console.log(over_30_names);

const under_30 = _filter(users, user => user.age < 30);
let under_30_ages = _map(under_30, user => user.age);
console.log(under_30_ages);

console.log(_map([1, 2, 3], num => num*2));

/**
 * 함수형 프로그래밍에서는 대입문을 많이 사용하지 않는 성향이 있다
 * 대입문을 줄이면 간결해지기도 하고 대입문 자체를 줄일수도 있다
 * 함수형 프로그래밍을 값을 만들어 놓고 문장을 내려가며 값을 변형해나가는 것이 아니라
 * 함수를 통과하면서 한번에 값을 새롭게 만드는 식으로 프로그래밍 한다
 */

let result = _map(
  _filter(users, 
    user => user.age > 30
  ),
  // user => user.name // 001
  _get('name') // 001 결국 같은 코드
)
console.log(result);

// 002
// _reduce 만들기
/**
 * 초기값 memo를 list 인자를 가지고 iter 함수를 재귀적으로 실행 시켜주는 것?
 * 말 그대로 축약하는 함수
 * 모든 데이터를 두번째 인자인 함수를 통해 축약 시켜서 새로운 데이터를 만드는 것
 */

let slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1)
}

function _reduce(list, iter, memo) {
  // 003
  if(arguments.length == 2) {
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

console.clear();
console.log(_reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// 들어 있는 모든 값을 통해 값을 만들어 나가는 축약 된 
// 리듀스 함수는 다양한 것을 할수 있고, 복잡하거나 어려운 로직을 단순하게 구현할수 있게 도와준다 
// 데이터를 함수에 적용하겠다 라는 선언적인 코드만 있다
// 그래서 코드가 정상적으로 작동할 것이고
// 두번째 함수를 통해서 어떤 순서로 실행할지 정해져 있기 때문에
// 미션이 단순하다

// 세번째 인자를 생략하는 방법으로도 사용 가능하다
// 003
console.log(_reduce([1, 2, 3, 4], (a, b) => a + b));






