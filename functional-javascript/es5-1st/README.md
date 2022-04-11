[정규표현식(Regular Expression)](https://github.com/rae-han/learn-web/tree/main/common/regular-expression)

[함수형 자바스크립트(Functional Javascript)](https://raehan.notion.site/Functional-JS-aa6206b5d29e4c9ab6ba6e3c0597af71)

[함수형 자바스크립트(Functional Javascript)][fxjs_link]
[fxjs_link]: https://raehan.notion.site/Functional-JS-aa6206b5d29e4c9ab6ba6e3c0597af71

[함수형 자바스크립트(Functional Javascript)](https://raehan.notion.site/Functional-JS-aa6206b5d29e4c9ab6ba6e3c0597af71, "funtional js")

# 0. 함수형 프로그래밍

## 0.1. 프로그래밍 패러다임

- 명령형 프로그래밍(imperative)
    - 무엇(What)을 할 것인지 나타내기 보다, 어떻게(How) 할 건지 설명하는 방식
    1. 절차지향 프로그래밍 - 수행되어야 할 순차적인 처리 과정을 포함하는 방식
    2. 객체지향 프로그래밍 - 객체들의 집합으로 프로그램의 상호작용을 표현
- 선언형 프로그래밍(declarative)
    - 무엇(What)을 할 건지 설명하는 방식
    - 함수형 프로그래밍 - 순수 함수를 조합하고 소프트웨어를 만드는 방식
    
- 함수형 프로그래밍은 거의 모든 것을 순수 함수로 나누어 문제를 해결하는 기법으로, 작은 문제를 해결하기 위한 함수를 작성하여 가독성을 높이고 유지보수를 용이하게 해준다.
- 클린 코드의 저자 Robert C. Martin은 함수형 프로그래밍을 대입문이 없는 프로그래밍이라 정의했다.
    
    ```jsx
    let a = [1, 2, 3, 4, 5];
    
    // 명령형 프로그래밍의 예시
    for (let i = 0; i < a.length; i++) {
      console.log(a[i],i);
    } // i에 값을 대입한다
    
    // 함수형 프로그래밍의 예시
    a.forEach((v, i) => console.log(v, i)); 
    // 1. 대입문을 사용하지 않는다.
    // 2. 작은 문제를 해결하기 위한 함수를 작성한다
    // -> 무엇을(What)에 포커스를 두고 출력을 하는 함수를 파라미터로 넘겼다.
    ```
    

## 0.2 함수형 프로그래밍이란?

### 0.2.1. 함수형 프로그래밍의 정의

> 함수형 프로그래밍은 부수효과가 없는 순수 함수를 1급 객체로 간주하여 파라미터로 넘기거나 반환값으로 사용할 수 있으며, 참조 투명성을 지킬 수 있다.
> 

여기서 부수효과(Side Effect)란 다음과 같은 변화 또는 변화가 발생하는 작업을 의미한다

- 변수의 값이 변경됨
- 자료구조를 제자리에서 수정함
- 객체의 필드값을 설정함
- 예외나 오류가 발생하며 실행이 중단됨
- 콘솔 또는 파일 I/O가 발생함

이런 부수 효과(Side Effect)들을 제거한 함수들을 순수 함수(Pure Function)이라 부르며, 함수형 프로그래밍에서 사용하는 함수는 이런 순수 함수들이다.

- Memory or I/O의 관점에서 Side Effect가 없는 함수
- 함수의 실행이 외부에 영향을 끼치지 않는 함수

순수 함수(Pure Function)을 이용하면 얻을 수 있는 효과는 다음과 같다.

- 함수 자체가 독립적이며 Side-Effect가 없기 때문에 Thread에 안전성을 보장받을 수 있다.
- 즉 언제 실행 됐는지 평가 시점이 중요하지 않고, 항상 같은 값을 리턴시켜 안전하고 다루기 쉽다.
- Thread에 안정성을 보장받아 병렬 처리를 동기화 없이 진행할 수 있다.
- 순수함수가 아닌 함수보다 강력한 조합성을 갖는다.

일급 객체란 다음과 같은 것들이 가능한 객체를 의미한다

- 변수나 데이터 구조 안에 담을 수 있다.
- 파라미터로 전달 할 수 있고, 인자(argument)로 전달 받을 수 있다.
- 반환값으로 사용할 수 있다.
- 할당에 사용된 이름과 무관하게 고유한 구별이 가능하다.

함수형 프로그래밍에서 함수는  일급 객체로 취급받기 때문에  함수를 파라미터로 넘기는 등의 작업이 가능하며, 자바스크립트도 마찬가지다.

자바스크립트에서 함수는 일급 함수이면서 일급 객체이고, 1급 객체이기 때문에 다른 일반적인 객체들에 적용 가능한 연산을 모두 지원한다. 그런 이유로 고차함수를 만들 수 있고, 콜백을 사용할 수 있다.

참조 투명성(Referential Transparency)란 다음과 같다.

- 동일한 인자에 대해 항상 동일한 결과를 반환해야 한다
- 참조 투명성을 통해 기존의 값을 변경되지 않고 유지된다(Immutable Data)

참조 투명성을 지키기 위해 부수효과가 없는 순수 함수를 사용하는 것이 아니라, 부수효과가 없는 순수 함수를 사용하기 때문에 참조 투명성을 지킬수 있다.

### 0.2.2. 함수형 프로그래밍 추가 설명

- 명령형 프로그래밍과 함수형 프로그래밍에서 사용하는 함수는 부수효과의 유/무에 따라 차이가 있다. 그에 따라 함수가 참조에 투명한지 안한지 나뉘어 지는데, 참조에 투명하다는 것은 말 그대로 함수를 실행하여도 어떠한 상태의 변화 없이 항상 동일한 결과를 반환하여 항상 동일하게(투명하게) 실행 결과를 참조(예측)할 수 있다는 것을 의미한다.
- 즉 어떤 함수 f에 어떠한 인자 x를 넣고 실행하게 되면, f는 입력된 인자에만 의존하므로 항상 f(x)라는 동일한 결과를 얻는다는 것을 의미한다. 부작용을 제거하여 프로그램의 동작을 이해하고 예측을 용이하게 하는 것은 함수형 프로그래밍으로 개발하려는 핵심 동기 중 하나이다.
- 이런 부분은 병령 처리 환경에서 개발할 때, 경쟁 상태(Race Condition)에 대한 비용을 줄여준다. 함수형 프로그래밍에서는 값의 대입 없이 항상 동일한 실행에 대해 동일한 결과를 반환하기 때문이다.

- 정리하자면 함수형 프로그래밍은 순수 함수를 통해 부수효과를 지양하고, 조합성을 강조하여 모듈화 수준을 높이는 프로그래밍 패러다임이다.

- 함수형 프로그래밍은 애플리케이션, 함수의 구성요소, 더 나아가서 언어 자체를 함수처럼 여기도록 만들고, 이러한 함수 개념을 가장 우선순위에 놓는다.
- 함수형 사고방식은 문제의 해결 방법을 동사(함수)들로 구성(조합)하는 것 - 마이클 포커스

```jsx
// 단순히 객체가 먼저 나오면 객체 지향 함수가 먼저 나오면 함수 지향 프로그래밍이다

person.moveLeft();
person.moveRight();
man.moveLeft();
man.moveRight();
// -> 객체지향에서는 데이터를 먼저 디자인하고 그 데이터에 맞는 메서드를 만든다

moveLeft(person);
moveRight(person);
moveLeft(man);
moveRight({ x: 5, y: 2 });
// -> 함수를 먼저 만들고, 그 함수에 맞게 데이터 세트를 구성한다
```

## 0. 예시

1. 
    
    ```jsx
    const add = (a, b) => {
    	return a+b;
    }
    // 동일한 인자에 항상 동일한 결과가 나오고 부수효과가 없으므로 순수함수이다.
    ```
    
2. 
    
    ```jsx
    let c = 10;
    const add = (a, b) => {
      return a + b + c;
    }
    // c값이 변하면 a, b 인자가 같더라도 결과 값이 달라질 수 있다.
    // 다만 c 값이 상수 값으로 고저오대 있다면 이 함수도 순수함수이다.
    ```
    
3. 
    
    ```jsx
    const add = (a, b) => {
      c = b;
      return a + b;
    }
    // 동일한 인자에 항상 동일한 결과가 나오지만,
    // 함수 실행 전후고 외부 상태인 c 값이 달라지므로 순수함수가 아니다.
    ```
    
4. 
    
    ```jsx
    let obj = { val: 10 };
    const add = (obj, b) => {
      obj.val += b;
    }
    
    // 인자로 들어온 값의 상태를 직접 변경하고, 새로운 값을 리턴하지도 않는다.
    // 함수형 프로그래밍에서는 원본 값을 두고 새로운 값을 만들어 원하는 부분에 새로운 값을 대치시킴으로 변경한다.
    // 이를 불변성 유지라고 한다.
    
    // 
    let arr1 = [1, 2, 3]
    arr1.push(4);
    
    //
    let arr2 = [1, 2, 3]
    arr2 = arr2.concat(4);
    ```
    
5. 
    
    ```jsx
    const addMaker = (a) => {
      return function(b) { // 클로저
        return a + b; 
      }
    };
    // 함수 내부에서만 a를 사용하며, a 값을 변경시키지 않는다. 참조만 할뿐 변경을 하지 않기 때문에 이 함수는 항상 동일한 값을 가리키고 있는 a와 함께 b를 더하는 순수 함수가 된다.
    
    const add10 = addMaker(10);
    console.log(add10(20)); // add10은 언제 평가해도 항상 동일한 값을 리턴시킨다
    ```
    
    > 클로저는 **함수와 그 함수가 선언된 렉시컬 환경과의 조합**이다.   
    A closure is the combination of a function and the lexical environment within which that function was declared.
    > 
    
    <aside>
    💡 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 **함수를 어디에 정의했는지에 따라 상위 스코프를 결정**한다. 이를 렉시컬 스코프(정적 스코프)라 한다.
    
    </aside>
    
6. 
    
    ```jsx
    const f4 = (f1, f2, f3) => {
      return f3(f1() + f2());
    }
    
    const result1 = f4(
      () => 2,
      () => 1,
      n => n*n
    );
    console.log(result1) // 9
    ```
    
    - 함수형 프로그래밍 패러다임은 위와 같은 형태를 띄게 된다.
    - 원하는 인자를 받아둔 함수에 함수를 인자로 받아서, 받은 함수의 로직을 원하는 시점에 평가하는 것이다.
        
        (함수가 함수를 인자로 받아서, 그 함수의 로직대로 원하는 시점에 평가하고, 원하는 인자를 받아둔 함수에게 적용하면서 로직을 완성해 나가는 것)
        
    - 비동기나 동시성이 일어나는 병렬 처리를 동기화 없이 처리할 수 있다.
    
    명령형 프로그래밍(함수지향) vs 선언형 프로그래밍(객체지향, 절차지향)
    
    절차지향 프로그래밍에서는 위에서 아래로 내려가면서 특정 변수의 값을 변경해 나가는 식으로 로직을 만든다. 객체지향 프로그래밍에서는 객체들을 만들어 놓고 객체들 간의 협업을 통해 로직을 만든다. 이벤트 등으로 서로를 연결한 후 상태의 변화를 감지하여 스스로 자신이 가진 값을 변경하거나, 상대의 메서드를 직접 실행하여 상태를 변경하는 식으로 프로그래밍을 한다.
    
    함수형 프로그래밍에서는 항상 동일하게 동작하는 함수를 만들고 보조 함수를 조합하는 식으로 로직을 완성한다. 내부에서 관리하고 있는 상태를 따로 두지 않고 넘겨진 인자에만 의존한다. 동일한 인자가 들어오면 항상 동일한 값을 리턴하도록 한다. 보조 함수 역시 인자이며, 보조 함수에서도 상태를 변경하지 않으면 보조 함수를 받은 함수는 항상 동일한 결과를 만드는 함수가 된다.
    
    객체지향적으로 작성된 코드에서도 이전 객체와 같은 상태를 지닌 새 객체를 만드는 식으로 부수 효과를 줄일 수 있다. 그러나 무수히 많고 각기 다른 종류로 나누어진 객체들을 복사하는 식으로 다루는 것은 운용도 어렵고 객체지향과 어울리지 않는다. 자신의 상태를 메서드를 통해 변경하는 것은 객체지향의 단점이 아니라 객체지향의 방법론 그 자체이다. 반면에 함수형 프로그래밍은 부수 효과를 최소화하는 것이 목표에 가깝다. 이것은 단점이냐 장점이냐의 이야기가 아니라 지향점의 차이에 대한 것이다.
    
    많은 사람들이 함수형 프로그래밍은 객체지향과 완전한 대척점에 있다고 생각하거나 그런 주장을 하기도 한다. 이것은 오해다. 결국에는 함께 동작해야 한다. 현대 프로그래밍에서 다루는 값은 대부분 객체이므로 함수형 프로그래밍에서도 결국 객체를 다뤄야 한다. 다만 기능 확장을 객체의 확장으로 풀어가느냐 함수 확장으로 풀어가느냐의 차이다. 객체를 확장하느냐 객체를 다루는 함수를 늘리느냐의 차이이며 추상화의 단위가 클래스이냐 함수이냐의 차이다.
    
- 함수형 프로그래밍이 앞으로 각광 받을 이유
    - 좋아지는 하드웨어 성능
    - 좋아지는 컴파일러
    - 좋아지는 분산 / 리액티브 환경
    - 동시성 + 병렬성 관련 기술
    - 함수형 프로그래밍 기술

    # 함수형 프로그래밍 - 1 (절차지향적 코드를 함수형으로)

# 1. 절차지향적으로 작성된 코드를 함수형으로 변경

## 1.1. 회원 목록 중 여러 명 찾기

### 1.1.1. 절차지향형 예제 코드

```jsx
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

// 명령형 코드
// 1. 30세 이상인 users를 거른다.
let temp_users1 = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users1.push(users[i]);
  }
}
console.log(temp_users1);

// 2. 30세 이상인 users의 names를 수집한다.
let names = [];
for (let i = 0; i < temp_users1.length; i++) {
  names.push(temp_users1[i].name);
}
console.log(names.length)
console.log(names);

// 3. 30세 미만인 users를 거른다.
let temp_users2 = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) { // ! 1, 3 코드에서 중복을 줄이려고해도 이 부분을 없애는게 난해하다
    temp_users2.push(users[i]);
  }
}
console.log(temp_users2);

// 4. 30세 미만인 users의 ages를 수집한다.
let ages = [];
for (let i = 0; i < temp_users2.length; i++) {
  ages.push(temp_users2[i].age);
}
console.log(ages.length);
console.log(ages);
```

위 코드에서 1, 3의 `for`문에서 `users`를 돌며 특정 조건을 만족하는 값을 모아 새로운 배열로 담고 있는데 `if` 문의 조건절 부분을 제외하고는 모두 동일한 코드를 가지고 있다. 

중복을 제거할 때 30 부분은 변수로 바꿀 수 있지만 비교 연산자인 `>=`와 `<` 부분의 중복을 줄이기가 난해하다. 이럴때 함수를 사용하여 쉽게 추상화할 수 있다.

### 1.1.2. for에서 filter로 if에서 predicate로

```jsx
const _filter = (list, predicate) => {
  let new_list = [];

  for(let i = 0; i<list.length; i++) {
    if(predicate(list[i])) { 
      new_list.push(list[i]);
    }
  }
}
```

1. `_filter` 함수는 인자로 `list`와 `predicate` 함수를 받는다.
2. 루프를 돌며 `list`의 i번째 값을 `predicate`에 넘겨준다.
3. `predicate` 함수는 `list.length` 만큼 실행되며, 결과가 참일 때만 `new_list.push` 를 실행한다.
    - `new_list.push`가 실행될지 여부를 `predicate` 함수에 완전히 위임했다.
    - `_filter` 함수는 `predicate` 함수 내부에서 어떤 일을 하는지 모른다.
    - 오직 `predicate` 함수의 결과에만 의존한다.
4. 마지막에 `new_list를` 리턴한다.
    - 이름에 `new_` 라는 접두사를 붙였는데 이는 함수형 프로그래밍적인 관점에서 굉장히 상징적이다.
    - 이전 값의 상태를 변경하지 않고 새로운 값을 만드는 식으로 값을 다루는 것은 함수형 프로그래밍의 매우 중요한 컨셉이다.

위 함수를 적용하면 아래와 같은 코드가 나온다.

```jsx
// 1. 30세 이상인 users를 거른다.
const over_30 = _filter(users, user => user.age >= 30);
console.log(over_30);

// 2. 30세 이상인 users의 names를 수집한다.
let names = [];
for (let i = 0; i < over_30.length; i++) {
  names.push(over_30[i].name);
}
console.log(names.length);
console.log(names);

// 3. 30세 미만인 users를 거른다.
const under_30 = _filter(users, user => user.age < 30);
console.log(under_30);

// 4. 30세 미만인 users의 ages를 수집한다.
let ages = [];
for (let i = 0; i < under_30.length; i++) {
  ages.push(under_30[i].age);
}
console.log(ages.length);
console.log(ages);
```

`_filter` 함수를 통해 1, 3의 반복되는 코드를 제거하였다.

함수형 프로그래밍은 함수를 사용하여 중복을 제거하거나 추상화를 한다. 추상화의 단위가 클래스, 객체, 메소드가 아니라 함수를 이용한다.

또한 어떤 조건일때 조건문 안으로 들어갈지 익명 함수로 정의하여,   `_filter` 함수 자리의 `predicate` 에 넘겨 위임하는데, 이렇게 함수를 인자로 받아 원하는 시점에 해당하는 함수가 알고있는 인자(함수)를 적용할 때 그 함수를 응용형 함수라 하고 이런 방식을 적응형 프로그래밍이라 한다.

그리고 이런식으로 함수를 인자로 받건, 받은 함수를 실행하거나, 함수를 리턴하는 것을 고차함수라 한다.

### 1.1.3. 함수형 프로그래밍적인 관점으로 filter 보기

함수형 프로그래밍 관점에서 살펴보면 `_filter` 함수에는 `for`도 있고 `if`도 있지만, `_filter` 함수는 항상 동일하게 인자에 동일한 동작을 하는 한 가지 로직을 가진 함수다.  `_filter` 함수의 로직은 외부나 내부의 어떤 상태 변화에도 의존하지 않는다. 함수 내부의 `new_list`의 값을 바꾸고 있지만, 그 변화에 의존하는 다른 로직이 없다. `for`는 `list.length` 만큼 무조건 루프를 돈다. `i`의 변화에 의존하여 루프를 돌지만 그 외에 `i`의 변화에 의존한 다른 로직은 없다. `i++`는 루프를 거들 뿐이다. `list[i]`의 값을 변경하거나 `list`의 개수를 변경하는 코드는 없다.

`new_list`는 이 함수에서 최초로 만들어졌고 외부의 어떠한 상황이나 상태와도 무관하다. `new_list`가 완성될 때까지는 외부에서 어떠한 접근도 할 수 없기 때문에 `_filter`의 결과도 달라질 수 없다. `new_list`가 완성되고 나면 `new_list`를 리턴해버리고 `_filter`는 완전히 종료된다. `new_list`가 외부로 반환되고 나면 `new_list` 와 `_filter`와의 연관성도 없어진다.

`_filter`의 `if`는 `predicate`의 결과에만 의존한다. `_filter`가 실행되는 부분은 `_filter`와 `users`, 그리고 `_filter` 에서 사용할 `predicate` 함수만 있다. 코드에는 `for`도, `if`도 없다. 별도의 로직이 없이 매우 단순하다. `predicate` 함수에서도 역시 값을 변경하지는 않고, 참/거짓 값을 `_filter`의 `if`에게 전달하는 일만 한다. 

---

명령형 프로그래밍(함수지향) vs 선언형 프로그래밍(객체지향, 절차지향)

절차지향 프로그래밍에서는 위에서 아래로 내려가면서 특정 변수의 값을 변경해 나가는 식으로 로직을 만든다. 객체지향 프로그래밍에서는 객체들을 만들어 놓고 객체들 간의 협업을 통해 로직을 만든다. 이벤트 등으로 서로를 연결한 후 상태의 변화를 감지하여 스스로 자신이 가진 값을 변경하거나, 상대의 메서드를 직접 실행하여 상태를 변경하는 식으로 프로그래밍을 한다.

함수형 프로그래밍에서는 항상 동일하게 동작하는 함수를 만들고 보조 함수를 조합하는 식으로 로직을 완성한다. 내부에서 관리하고 있는 상태를 따로 두지 않고 넘겨진 인자에만 의존한다. 동일한 인자가 들어오면 항상 동일한 값을 리턴하도록 한다. 보조 함수 역시 인자이며, 보조 함수에서도 상태를 변경하지 않으면 보조 함수를 받은 함수는 항상 동일한 결과를 만드는 함수가 된다.

객체지향적으로 작성된 코드에서도 이전 객체와 같은 상태를 지닌 새 객체를 만드는 식으로 부수 효과를 줄일 수 있다. 그러나 무수히 많고 각기 다른 종류로 나누어진 객체들을 복사하는 식으로 다루는 것은 운용도 어렵고 객체지향과 어울리지 않는다. 자신의 상태를 메서드를 통해 변경하는 것은 객체지향의 단점이 아니라 객체지향의 방법론 그 자체이다. 반면에 함수형 프로그래밍은 부수 효과를 최소화하는 것이 목표에 가깝다. 이것은 단점이냐 장점이냐의 이야기가 아니라 지향점의 차이에 대한 것이다.

많은 사람들이 함수형 프로그래밍은 객체지향과 완전한 대척점에 있다고 생각하거나 그런 주장을 하기도 한다. 이것은 오해다. 결국에는 함께 동작해야 한다. 현대 프로그래밍에서 다루는 값은 대부분 객체이므로 함수형 프로그래밍에서도 결국 객체를 다뤄야 한다. 다만 기능 확장을 객체의 확장으로 풀어가느냐 함수 확장으로 풀어가느냐의 차이다. 객체를 확장하느냐 객체를 다루는 함수를 늘리느냐의 차이이며 추상화의 단위가 클래스이냐 함수이냐의 차이다.

### 1.1.4. map 함수

위 코드에서 2, 4는 특정 값을 추출하여 같은 크기의 새로운 배열을 만들고 원 데이터와 1:1로 패핑되는 다른 값을 만들어 담고 있다. 이 코드를 그대로 활용하여 `_map`이라는 함수를 만들면 아래와 같다.

```jsx
const _map = (list, iteratee) => {
  let new_list = [];

  for(let i = 0; i < list.length; i++) {
    new_list.push(iteratee(list[i]));
  }

  return new_list;
}
```

기존의 중복됐던 코드와 거의 동일하고 새로운 리스트에 무엇을 넣을지에 대해 `iteratee` or  `mapper` 함수에 위임했다.

_map  함수 내에서는 데이터형이 어떻게 생겼는지 보이지 않는데, 이것은 함수형 프로그래밍의 중요한 특징중 하나로 관심사가 완전히 분리된다.

위 함수를 적용하면 아래와 같은 코드가 나온다.

```jsx
// 1. 30세 이상인 users를 거른다.
const over_30 = _filter(users, user => user.age >= 30);
console.log(over_30);

// 2. 30세 이상인 users의 names를 수집한다.
let over_30_names = _map(over_30, user => user.name);
console.log(over_30_names.length);
console.log(over_30_names);

// 3. 30세 미만인 users를 거른다.
const under_30 = _filter(users, user => user.age < 30);
console.log(under_30);

// 4. 30세 미만인 users의 ages를 수집한다.
let under_30_ages = _map(under_30, user => user.age);
console.log(under_30_ages.length);
console.log(under_30_ages);
```

코드에 for도 없어지고 if도 없어졌다.

하지만 _filter 함수와 _map 함수에는 명령형 코드가 있을수 있다. 즉 모든 선언형 코드는 명령형 코드 위에 쓰여진다 말할수 있다.

### 1.1.5. 실행 결과로 바로 실행하기

함수의 리턴 값을 바로 다른 함수의 인자로 사용하면 변수 할당을 줄일 수 있다. 

```jsx
// 1. 2. 30세 이상인 users의 names를 수집한다.
let over_30_names = _map(
	_filter(users, user => user.age >= 30),
	user => user.name
);
console.log(over_30_names.length);
console.log(over_30_names);

// 3. 4. 30세 미만인 users의 ages를 수집한다.
let under_30_ages = _map(
	users, user => user.age < 30, 
	user => user.age
);
console.log(under_30_ages.length);
console.log(under_30_ages);
```

추가로 작은 함수(`log_length`)를 하나 더 만들면 변수 할당을 모두 없앨 수 있다.

전체 코드 완성은 아래와 같다.

```jsx
const _filter = (list, predicate) => {
	let new_list = [];
	
	for(let i = 0; i<list.length; i++) {
	  if(predicate(list[i])) { 
	    new_list.push(list[i]);
	  }
	}
}

const _map = (list, mapper) => {
  let new_list = [];

  for(let i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }

  return new_list;
}

const log_length = value => {
	console.log(value.length)
	return value;
}

// 1. 2. 30세 이상인 users의 names를 수집한다.
console.log(log_length(
	_map(
		_filter(users, user => user.age >= 30), 
		user => user.name
	),
));

// 3. 4. 30세 미만인 users의 ages를 수집한다.
console.log(log_length(
	_map(
		_filter(users, user => user.age < 30), 
		user => user.age
	),
));
```

### 1.1.6 함수를 값으로 다룬 예제의 실용성

0장의 [`addMaker`]([https://www.notion.so/raehan/0-df3651644f1b4296bf69e1988c8edfa1#cf15043509384b37bfff2e2d47662c00](https://www.notion.so/df3651644f1b4296bf69e1988c8edfa1))와 비슷한 패턴의 함수가 실제로도 많이 쓰이는데 해당 키에 대한 값을 넘겨주는 `_get` 함수를 만들면 위의 코드를 더 줄일수 있다.

```jsx
const _get = key => {
	return obj => {
		return obj[key]
	}
}
```

```jsx
// 1. 2. 30세 이상인 users의 names를 수집한다.
console.log(log_length(
	_map(
		_filter(users, user => user.age >= 30), 
		_get('name')
	),
));

// 3. 4. 30세 미만인 users의 ages를 수집한다.
console.log(log_length(
	_map(
		_filter(users, user => user.age < 30), 
		_get('age')
	),
));
```

`_map` 함수가 사용할 `iteratee`(or `mapper`) 함수를 `_get` 함수가 리턴한 함수로 대체 함으로, 익명 함수 선언이 사라졌다.

### 1.1.7. 모듈화한 _map과 _filter의 중복된 반복을 _each로 더 깊게 모듈화 하기

1. 전
    
    ```jsx
    const _filter = (list, predicate) => {
    	let new_list = [];
    	
    	for(let i = 0; i<list.length; i++) {
    	  if(predicate(list[i])) { 
    	    new_list.push(list[i]);
    	  }
    	}
    
    	return new_list;
    }
    
    const _map = (list, mapper) => {
      let new_list = [];
    
      for(let i = 0; i < list.length; i++) {
        new_list.push(mapper(list[i]));
      }
    
      return new_list;
    }
    ```
    
2. 후
    
    ```jsx
    function _each(list, iter) {
      for(let i = 0; i < list.length; i++) {
        iter(list[i]); // 반복문을 돌면서 안에서 하는 일을 위임하는 함수
      }
      return list;
    }
    ```
    
    ```jsx
    const _each = (list, iteratee) => {
    	for(let i = 0; i < list.length; i++) {
    		iteratee(list[i]);
    	}
    }
    
    const _filter = (list, predicate) => {
    	let new_list = [];
    
    	_each(list, value => {
    		if(predicate(value)) {
    			new_list.push(value)
    		}
    	});
    
    	return new_list;
    }
    
    const _map = (list, mapper) => {
      let new_list = [];
    
      _each(list, value => {
    		new_list.push(mapper(value));
    	})
    
      return new_list;
    }
    ```
    

### ref. 다형성

자바스크립트 Array 객체에는 이미 map, filter 함수가 있다. 하지만 객체 안에 내장돼 있는 함수는 메서드이고, 순수 함수가 아니라 객체의 상태에 따라 결과가 달라진다.
메서드는 객체지향 프로그래밍이다. 메서드는 해당 클래스에 정의돼 있기 때문에(JS에서는 정확히 말하자면 프로토타입) 해당 클래스의 인스턴스에만 사용 가능하다.
자바스크립트에는 Array가 아닌데 Array처럼 여겨지는 유사배열 객체가 많다. 여기서 함수형 프로그래밍을 사용한다면 함수에 맞게 데이터만 맞추면 데이터 타입에 영향 받지 않고 사용 가능하다.

데이터가 먼저 나오는 프로그래밍보다 함수가 먼저 나오는 프로그래밍이 다형성에 좀 더 구애받지 않고 프로그래밍을 할수 있다. 객체 지향을 해당하는 객체가 생겨야 기능을 수행할수 있다.

함수 지향은 함수가 먼저 존재하기 때문에, 데이터가 생기지 않더라도 평가 시점이 상대적으로 유연해지고, 높은 조합성을 갖게 된다.

1. 외부 다형성
유사배열이나 함수 내부의 기본 객체인 arguments 같은 Array 형태의 객체가 들어와도 모두 실행이가능하다. 특정 객체에만 적용 가능한 함수(메서드)가 아닌, 함수이기 때문에 인자에 타입만 맞으면 모두 실행 가능하다.
즉 특정 객체에 속해있는 메서드가 아닌 순수 함수 그 자체이기 때문에 바로 실행이 가능하다.
2. 내부 다형성
어떤 값이든 다 수행할수 있게 하는 것은 위 코드 기준으로 2번째 인자로 들어오는 보조 함수가 하는 역할이다.(predicate, mapper, interatee...)
내부 값에 대한 다형성은 보조함수가 책임을 지고, 넘기는 값과 그 값에 대한 이해를 가지고 개발자가 보조 함수를 정할수 있으며, 보조 함수에 위임하기 때문에 데이터 형으로부터 자유롭고 다형성을 높이는데 유리하다.(예를 들면 데이터가 숫자라면 숫자에 맞는 보조 함수를 작성하고, 노드리스트가 들어오면 그에 맞는 보조함수를 작성하면 된다.)

# 함수형 프로그래밍 - 2 (커링)

## 1.2. 커링

### 1.2.1. 커링과 커링한 함수

여러 개의 인자를 가진 함수를 호출 할 경우, 파라미터의 수보다 적은 수의 파라미터를 인자로 받으면 누락된 파라이터를 인자로 받는 기법을 말한다. 함수 하나가 n개의 인자를 받는 과정을 n개의 함수로 각각의 인자로 받도록 하고, 모든 인자가 다 채워졌을 때 실행하도록 바꾸는 것이다. 커링은 함수를 호출하지 않는다. 다만 변환할 뿐이다.

```jsx
f(x)(y) = x + y
// 여기서 f(x) = g 라고 보면
g(y) = x + y 
// 이 시점에서 x는 더 이상 변수가 아니라 상수이다.
f(1)(2) = g(2) = 1 + 2 = 3
```

또한 이렇게 변형된 함수의 형태를 커리한 형태(curried form)이라고 한다.

```jsx
function _curry(fn) {
  return function(a) {
    return function(b) {
      return fn(a, b); // 미리 받은 함수 본체를 안쪽에서 평가
    }
  }
}
```

```jsx
const _curry(fn) = a => b => fn(a, b); // 미리 받은 함수 본체를 안쪽에서 평가
```

```jsx
const normalAdd = (a, b) => a + b;
console.log(normalAdd(1, 2)); // 3

const curriedAdd = _curry((a, b) => a+b);
const add1 = curriedAdd(1); // 이 시점에서 a는 더 이상 변수가 아니라 상수(constant)이다
console.log(add1(2)); // 3
console.log(curriedAdd(1)(2)); // 3
```

상황에 따라 두 호출 모두 결과 값을 반환하도록 할수 있다.

```jsx
const _curry(fn) => (a, b) => {
	if(arguments.length === 2) return fn(a, b);

	return b => fn(a, b);
}
```

```jsx
const curriedAdd = _curry((a, b) => a+b);

console.log(curriedAdd(1, 2)); // 3
console.log(curriedAdd(1)(2)); // 3
```

삼항연산을 이용하여 아래와 같이 바꿀수 있다.

```jsx
const _curry = fn => (a, b) => arguments.length === 2 ? fn(a, b) : b => fn(a, b);
```

### 1.2.2. curryr (curry right)

```jsx
const sub = _curry((a, b) => a - b);

const sub10 = sub(10);
console.log(sub10(5)); // 5
```

위 코드에서 `sub10` 함수는 10을 빼는 듯한 이름을 가졌는데 실제로는 10에서 들어온 인자를 빼는 함수이다.
이럴때 `curryr`을 사용하여 평가할 수를 뒤집어준다.

```jsx
function _curryr(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : function(b) {
      return fn(b, a); // 미리 받은 함수 본체를 안쪽에서 평가
    }
  }
}
```

```jsx
const _curryr = fn => (a, b) => b !== undefined ? fn(a, b) : (b => fn(b, a));
```

```jsx
const sub = _curryr((a, b) => a - b);

const sub10 = sub(10);
console.log(sub10(5)); // -5
```

객체의 키 값을 입력하면 키에 대응하는 값을 출력하는  `_get` 라는 함수가 있을 때, `_curryr` 함수를 통해 정의하면 평가 순서를 뒤짚어 인자를 오른쪽부터 적용되게 사용할 수 있다.

```jsx
const user = { id: 1, name: '이름값', age: 31 };

// 일반 적인 get
const _get = (obj, key) => obj === null ? undefined : obj[key];

console.log(user.name); // 이름값
console.log(_get(user, 'name')); // 이름값

const _curriedGet = _curryr((obj, key) => obj === null ? undefined : obj[key]);;
const getName = _curriedGet('name');
console.log(getName(user)); // 어떤 역할을 하는 함수인지 좀 더 명확하다.
```

### 1.2.3. _reduce

초기값 `memo`를 `list` 인자를 가지고 `iteratee` 함수를 재귀적으로 실행 시켜주는 함수로 이름 그대로 축약하는 함수이다. 흔히 보는 가산기의 형태를 띈다.

<aside>
💡 왜 축약인가?
만약 list의 인자가 3개라면 아래와 같이 재귀적으로 호출하는 형태를 띈다.

_reduce([1, 2, 3], add, 0);

memo = add(0, 1);
memo = add(memo, 2);
memo = add(memo, 3);

add(add(add(0, 1), 2), 3);

위 로직을 reduce 함수를 사용하면, 모든 데이터를 두번째 인자로 들어오는 보조 함수를 통해 축약 시켜서 데이터를 만들게 된다.

</aside>

```jsx
const _reduce = (list, iteratee, memo) => {
	for(let i = 0; i<list.length; i++) {
		memo = iteratee(list[i], memo);	
	}
	return memo;
}
```

앞서 구현한 [`_each` 함수]([https://www.notion.so/raehan/1-76fed2dcea894b4c85212617630f8d45#d39e6d24ff3049cebcd0267228255a91](https://www.notion.so/1-76fed2dcea894b4c85212617630f8d45))를 통해 아래와 같이 바꿀 수 있다.

```jsx
const _reduce = (list, iteratee, memo) => {
	_each(list, value => {
		memo = iteratee(memo, value)
	})

	return memo;
}
```

```jsx
console.log(_reduce([1, 2, 3], (a, b) => a + b, 0)); // 6
```

아래와 같이 수정해서 초기 값이 없을 때 `list` 인자의 첫 번째 값을 초기 값으로 사용할 수 있다.

```jsx
function _reduce (list, iteratee, memo) { // arguments를 사용하기위해 임시로 function 키워드 사용
	if(arguments.length === 2) { // memo 값이 없다면.
		memo = list[0];
		list = list.slice(1);
	}

	_each(list, value => {
		memo = iteratee(memo, value)
	})

	return memo;
}
```

하지만 위 코드에서  `slice`는 `Array` 객체의 메서드이기 때문에 `list`가 `Array` 일때만 사용 가능하다. 아래와 같이 작성하면 유사 배열 객체에서도 사용 가능하다.

```jsx
function _reduce = (list, iteratee, memo) {
	if(arguments.length === 2) { // memo 값이 없다면.
		memo = list[0];
		let slice = Array.prototype.slice;
		slice.call(list, 1); // slice 함수를 실행 시키는데 list를 이용(this)하고 인자로는 1을 받는다. 
	}

	_each(list, value => {
		memo = iteratee(memo, value)
	})

	return memo;
}
```

특정 인자를 제거하고 나머지 값을 반환하는 것을 `_rest` 함수로 모듈화 할수 있다.

```jsx
let slice = Array.prototype.slice;
const _rest = (list, num = 1) => slice.call(list, num);

function _reduce(list, iter, memo) {
	if(arguments.length === 2) {
		memo = list[0];
		list = _rest(list);
	}

	_each(list, value => memo = iter(memo, value));

	return memo
}
```

또한 _reduce 함수를 arrow function으로 선언할 때 arguments를 사용하고 싶다면 대체로 아래와 같이 사용할 수 있다.

# 함수형 프로그래밍 - 3 (연속적인 함수 실행)

## 1.3. 연속적인 함수 실행

### 1.3.1. _pipe 함수

함수를 인제로 받아서 함수를 연속적으로 실행시켜주는 함수로, 정확히는 함수만 인자로 받는 함수이다.
내부적으로 결국엔 `_reduce` 함수이다. `_pipe` 함수가 좀 더 추상화 된 레벨이 `_reduce` 함수이고, `_pipe` 는 좀 더 특화된 함수이다.
함수로 구성된 배열을 받고, 인자를 함수들에 연속적으로 적용한 최종 결과로 축약한 함수이다.

```jsx
function _pipe() {
  const fns = arguments;

  return function(arg) {
    return _reduce(fns, function(arg, fn) {
      return fn(arg)
    }, arg)
  }
}
```

```jsx
const _pipe = (...fns) => arg => _reduce(fns, (arg, fn) => fn(arg), arg);
```

```jsx
const fn = _pipe(
  n => n + 1,
  n => n * 2,
  n => n * n,
);
console.log(fn(1)); // 16
```

기존 예제를 `_pipe` 함수를 통해 실행하면 다음과 같아진다.

```jsx
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
```

### 1.3.2. _go 함수

즉시 실행되는 `_pipe` 함수이다.
`_pipe` 함수는 추상화된 함수를 리턴하는 함수라면, `_go` 함수는 추상화 시킨 함수에 인자를 넣어서 즉시 실행시키는 함수이다.

```jsx
function _go(arg) {
  let fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
	// return _pipe(...fns)(arg);
}
```

pipeline을 만들 때, _pipe 함수는 인자로 함수를 받기 때문에 apply를 통해 인자를 받는다.

```jsx
const _go = (arg, ...fns) => _pipe.apply(null, fns)(arg);
```

자바스크립트의 전개 연산자(spread syntax)를 통해 apply() 메서드를 대체할 수 있다.

```jsx
const _go = (arg, ...fns) => _pipe(...fns)(arg);
```

기존 예제를 `_go` 함수를 통해 실행하면 다음과 같아진다.

```jsx
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
```

```jsx
_go(
  users,
  users => _filter(users, user => user.age >= 30),
  users => _map(users, _get('name')),
  console.log,
)

_go(
  users,
  users => _filter(users, user => user.age < 30),
  users => _map(users, _get('age')),
  console.log,
)
```

_pipe와 _go 함수를 사용하면 기존의 함수를 중첩 하는 것보다 훨씬 명시적으로 코드를 읽어 나갈수 있다.

### 1.3.3. curryr 함수를 통한 리펙토링

`_pipe` 함수와 `_pipe` 함수를 구체화 시킨 `_go` 함수를 보면, 결국 `_reduce` 함수를 커리한 형태를 지닌다.

마지막 `_go` 함수 기준으로 초기 값을 받아서, 해당 값을 인자로 이용하여 첫번째로 오는 함수를 실행시켜 준 후, 첫번째 함수를 실행시켜 반환된 값을 다음 함수 인자로 이용하여 실행 시켜주는 것을 반복하고 있다.
코드를 기준으로 값으로 받은 `users`를 함수에서 인자로 받아 안쪽 함수(`_filter`, `_map`)에 전달하고, 안쪽 함수에서 다시 `users`의 요소를 하나하나 user라는 값으로 보조 함수에 넘겨줘서 그 안에서 데이터를 리턴시킨다. 
즉 안쪽 함수는 항상 보조 함수가 있는 형태인데 이를 `curryr`를 사용하여 평가 순서를 다르게 갈 수 있으며 예제 코드를 바꿀 수 있다.

```jsx
// 이 작업을 하기 전에 const(상수) 식별자로 선언된 _map, _filter 함수를 let(변수) 식별자로 바꿔줘야 한다.
_map = _curryr(_map);
_filter = _curryr(_filter);
```

`_curryr` 함수를 사용하여 `_map`과 `_filter` 함수의 평가 순서를 뒤집어준다.

기존 코드를 아래와 같이 바꿔줄 수 있다.

```jsx
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
```

```jsx
// _curryr 함수를 사용 하기 전
let memo = users;
memo = ((users => _filter(users, user => user.age >= 30)(memo);
memo = ((users => _map(users, _get('name'))(memo);
memo = console.log(memo);

// _curryr 함수로 함수에 변형을 준 후
let memo = users;
memo = _filter(user => user.age >= 30)(memo);
memo = _map(_get('age'))(memo);
memo = console.log(memo);
```

코드가 훨씬 간결하고 체인 패턴(자바스크립트에서 배열 고차함수의 메소드 체이닝)과 비슷한 정도의 표현력을 보여준다.

기존에 인자와 보조 함수를 받는 함수 `_filter`, `_map`을 `_curryr`을 이용하여 다시 만들고, 그로 인해 그 함수가 인자(예제에서는 보조 함수)를 하나만 넘겼을 때 인자가 오른쪽부터 적용된 또 다른 함수를 리턴한다. 그리고 `_go` 라는 함수는 인자와 함수들을 받아서 함수를 연속적으로 실행시키면서 인자를 변화해 나가는데 이를 함수형 프로그래밍이라 한다.

함수의 평가시점이나 함수가 인자에 적용돼 가는 과정에서 사이드 이팩트가 없는 순수 함수들로 구성될 때 이런 조합성을 만들수 있다.

결론적으로 순수 함수의 평가 시점을 다루면서 조합성을 강조하고 추상화의 단위를 함수로 하는 프로그래밍을 함수형 프로그래밍이라 할 수 있다.
