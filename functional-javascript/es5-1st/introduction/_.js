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
 * 
 * 다형성을 높게 프로그래밍을 할수 있다
 * 데이터가 먼저 나오는 프로그래밍보다 함수가 먼저 나오는 프로그래밍이
 * 
 * 객체 지향은 해당하는 객체가 생겨야 기능을 수행할수 있다
 * 
 * 함수는 함수가 먼저 존재하기 때문에, 데이터가 생기지 않더라도 평가 시점이 상대적으로 유연해진다
 * 이 이유 덕분에 더 높은 조합성을 갖는다
 */

_map([1, 2, 3, 4], function(v) { return v })
/**
 * 여기서 두 번째 인자는 반드시 콜백 함수가 아니다
 * 무조건 콜백 함수라는 명칭으로 부를때가 있는데 프레디케이트나 이터 맴퍼 등의 정확한 명칭을 쓴느게 좋다
 */

/**
 * 2. 외부 다형성
 * - array_like 값이 들어오거나 arguments 값이 들어오거나, document.querySelectorAll 값이 들어오거나 다 실행 가능
 * - 돌림직한 모든 객체를 다 돌릴수 있또록 하는 것은 고차함수의 구조 맵이 어떻게 구현됐느냐에 따라 결정되지만
 * - 순수 함수로 만들었고 어레이라이ㅡ면 다 돌릴수 있게 만든 기법은 맵 이치 필터가 담당하지만
 * 
 * 3. 내부 다형성
 * - 배열안에 어떤 값이든 들어있어도 다 수행할수 있게 하는 것은 2번째 인자인 보조 함수가 하는 역할이다
 * - 프레디 맵퍼 이터레이터
 * - 내부 값에 대한 다형성은 보조함수가 책임을 지기 때문에
 * - 넘기는 값과 그 값에 대한 이해로 숫자니까 더할 것이라던지 노드니까 노드 네임을 참조할 것이라던지 개발자가 정할 수 있기 때문에 
 * - 보조 함수에 위임하기 때문에 데이터 형으로부터 자유롭고 다형성을 높이는데 유리하다
 */

/**
 * 4. 커링 ( _curry, _curryr)
 */

function _curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b); // 미리 받은 함수 본체를 안쪽에서 평가
    }
  }
}

const add1 = function(a, b) {
  return a+b;
}

console.log(add1(5, 10));

const add2 = _curry(function(a, b) {
  return a+b;
})

const add5 = add2(5);
console.log(add5(10));
console.log(add2(10)(5));

function _curry2(fn) {
  return function(a, b) {
    if(arguments.length === 2) return fn(a, b);

    return function(b) {
      return fn(a, b); // 미리 받은 함수 본체를 안쪽에서 평가
    }
  }
}

const add3 = _curry2(function(a, b) {
  return a+b;
})

console.log(add3(10)(5))
console.log(add3(10, 5))