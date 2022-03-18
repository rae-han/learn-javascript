// const _each = (list, iter) => {
//   for(let i = 0; i < list.length; i++) {
//     iter(list[i]); // 반복문을 돌면서 안에서 하는 일을 위임하는 함수
//   }

//   return list;
// }

function _each(list, iter) {
  for(let i = 0; i < list.length; i++) {
    iter(list[i]); // 반복문을 돌면서 안에서 하는 일을 위임하는 함수
  }

  return list;
}

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
function _filter(list, predi) {
  let new_list = [];

  _each(list, function(val) {
    if(predi(val)) {
      new_list.push(val)
    }
  });

  return new_list; // 이거 주석 처리하면 이상한 에러가?
}

// const _map = (list, mapper) => {
//   let new_list = [];

//   // for(let i = 0; i < list.length; i++) {
//   //   new_list.push(mapper(list[i]));
//   // }
//   // /**
//   //  * mapper 함수에게 어떤 데이터를 수집할지 완전히 위임한다
//   //  * 데이터형이 어떻게 생겼는지 보이지 않는다 -> 함수형 프로그래밍의 중요한 특징중 하나
//   //  * 관심사가 완전비 불리된다
//   //  */

//   _each(list, val => new_list.push(mapper(list[val])));

//   return new_list;
// }
function _map(list, mapper) {
  let new_list = [];

  _each(list, function(val) {
    new_list.push(mapper(val));
  })

  return new_list;
}

module.exports = {
  _filter,
  _map,
}

/**
 * # 다형성
 * 자바스크립트에는 이미 Array 객체에 map, filter 함수가 있다
 * 하지만 우리가 이걸 만든 이유는 저건 함수가 아니라 메서드이다
 * 순수 함수가 아니라 객체의 상태에 따라 결과가 달라진다
 * 
 * 메서드는 객체지향 프로그래밍
 * 
 * 메서드는 해당 클래스에 정의돼 있기 때문에 해당 클래스의 인스턴스에만 사용 가능하다
 * 위의 함수들도 Array 에서만 사용 가능하다
 * 
 * 자바스크립트는 Array가 아닌다 Array같이 여겨지는 객체가 많다(유사배열)
 * 
 * 함수형은 함수에 맞게 데이터만 맞추면 데이터에 영향 받지 않고 사용 가능하다
 */

const abc = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
}
console.log(abc)