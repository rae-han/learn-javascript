# 1. 클로저 정의

> 클로저는 **함수와 그 함수가 선언된 렉시컬 환경과의 조합**이다.   
A closure is the combination of a function and the lexical environment within which that function was declared.
> 

```jsx
// ex1
const x = 1;

function outerFunc1() {
  const x = 10;

  function innerFunc1() {
    console.log(x);
  }

  innerFunc1();
}

outerFunc1(); // 10

// ex2
const y = 2;

function outerFunc2 () {
  const y = 20;
  innerFunc2();
}

function innerFunc2() {
  console.log(y);
}

outerFunc2(); // 2
innerFunc2(); // 2
```

예제 1에서 함수 outer 내에서 내부함수 inner가 선언되고 호출됐다. 이때 내부함수 inner는 자신을 포함하고 있는 외부함수outer의 변수 x에 접근할 수 있다. 이는 함수 inner가 함수 outer의 내부에 선언되었기 때문이다.

### 참고. 렉시컬 스코프

자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 **함수를 어디에 정의했는지에 따라 상위 스코프를 결정**한다. 이를 렉시컬 스코프(정적 스코프)라 한다.

실행 컨텍스트의 관점에서 내부함수 inner가 호출되면 자신의 실행 컨텍스트가 실행 컨텍스트 스택에 쌓이고 변수 객체, 스코프 체인, this에 바인딩할 객체가 결정된다. 이때 스코프 체인은 전역 스코프를 가리키는 전역 객체와 함수 outer의 스코프를 가리키는 함수 outer의 활성 객체 그리고 함수 자신의 스코프를 가리키는 활성 객체를 순차적으로 바인딩한다. 스코프 체인이 바인딩한 객체가 바로 렉시컬 스코프의 실체이다.

### 예시.

```jsx
function outerFunc() {
	let x = 10;
  let innerFunc = function () {
    console.log(x)
  }

  return innerFunc;
}

let inner = outerFunc();
inner(); // 10
```

위코드와 다르게 내부 함수 inner를 함수 outer 내에서 호출하는 것이 아니라 반환하도록 변경했데 함수 outer는 내부 함수 inner를 반환하고 콜스택(실행 컨텍스트 스택)에서 제거되므로 함수 outer의 변수 x 또한 더 이상 유효하지 않게 돼 보이지만 실행 결과는 변수 x의 값인 10이다.  life-cycle이 종료되어 실행 컨텍스트 스택에서 제거된 함수 outer의 지역변수 x가 동작한다.

이처럼 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는데 이러한 함수를 클로저(Closure)라고 부른다.

### 1.1 클로저의 구성

- 클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.
1. 함수: 반환된 내부 함수
2. 그 함수가 선언될 때의 렉시컬 환경: 내부 함수가 선언됐을 때의 스코프

### 1.2 정리.

- 즉, 클로저는 바환된 내부함수가 자신이 선언됐을 때의 환경인 스코프를 기억하여 자신이 선언됐을 때의 환경 밖에서 호출되어도 그 환경에 접글할 수 있는 함수
→ 자신이 생성될 때의 환경을 기억하는 함수
- 클로저에 의해 참조되는 외부함수의 변수(outer 함수의 변수 x)를 자유변수(Free variable)라 부른다. 클로저라는 이름은 자유변수에 함수가 닫혀있다(closed)라는 의미로 자유변수에 엮여있는 함수라는 뜻이다.

실행 컨텍스트의 관점에서는, 내부함수가 유효한 상태에서 외부함수가 종료하여 외부함수의 실행 컨텍스트가 반환되어도, 외부함수 실행 컨텍스트 내의 활성 객체(Activation object)(변수, 함수 선언 등의 정보를 가지고 있다)는 내부함수에 의해 참조되는 한 유효하여 내부함수가 스코프 체인을 통해 참조할 수 있는 것을 의미한다.

즉 외부함수가 이미 반환되었어도 외부함수 내의 변수는 이를 필요로 하는 내부함수가 하나 이상 존재하는 경우 계속 유지된다. 이때 내부함수가 외부함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다는 것에 주의하여야 한다.

![closure.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0a4e1aee-fa1b-4bf5-a60d-b7c583aeb1c2/closure.png)

# 2. 클로저의 활용

클로저는 자신이 생성될 때의 환경을 기억해야 하므로 메모리 차원에서 손해를 볼 수 있다. 

But 클로저는 자바스크립트의 강력한 기능으로 이를 적극적으로 사용해야 한다.

## 2.1 상태 유지

클로저가 가장 유용하게 사용되는 상황은 **현재 상태를 기억하고 변경된 최신 상태를 유지**하는 것이다.

```html
<!DOCTYPE html>
<html>
<body>
  <button class="toggle">TOGGLE</button>
  <div class="box" style="width: 100px; height: 100px; background: red;"></div>

  <script>
    let box = document.querySelector('.box');
    let toggleBtn = document.querySelector('.toggle');

    let toggle = (function () {
      let isShow = false;

      // 1 클로저를 반환
      return function () {
        box.style.display = isShow ? 'block' : 'none';
        // 3 상태 변경
        isShow = !isShow;
      };
    })();

    // 2 이벤트 프로퍼티에 클로저를 할당
    toggleBtn.onclick = toggle;
  </script>
</body>
</html>
```

## 2.2 전역 변수 사용 억제

### 2.2.1 전역 변수

```html
<!DOCTYPE html>
<html>
<body>
  <p>전역 변수를 사용한 Counting</p>
  <button id="inclease">+</button>
  <p id="count">0</p>
  <script>
    let incleaseBtn = document.getElementById('inclease');
    let count = document.getElementById('count');

    // 카운트 상태를 유지하기 위한 전역 변수
    let counter = 0;

    function increase() {
      return ++counter;
    }

    incleaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
  </script>
</body>
</html>
```

잘 동작하지만 변수에 아무나 접근 가능한 좋지 않은 코드다.

### 2.2.2 지역 변수

```html
<!DOCTYPE html>
<html>
<body>
  <p>지역 변수를 사용한 Counting</p>
  <button id="inclease">+</button>
  <p id="count">0</p>
  <script>
    let incleaseBtn = document.getElementById('inclease');
    let count = document.getElementById('count');

    function increase() {
      // 카운트 상태를 유지하기 위한 지역 변수
      let counter = 0;
      return ++counter;
    }

    incleaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
  </script>
</body>
</html>
```

지역변수는 라이프사이클이 끝나면 실행컨텍스트에서 소멸하므로 변경된 이전 상태를 기억하지 못한다.

### 2.2.3 클로저 사

```html
<!DOCTYPE html>
<html>
  <body>
  <p>클로저를 사용한 Counting</p>
  <button id="inclease">+</button>
  <p id="count">0</p>
  <script>
    let incleaseBtn = document.getElementById('inclease');
    let count = document.getElementById('count');

    let increase = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      let counter = 0;
      // 클로저를 반환
      return function () {
        return ++counter;
      };
    }());

    incleaseBtn.onclick = function () {
      count.innerHTML = increase();
    };
  </script>
</body>
</html>
```

즉시실행함수(IIFE, immediately-invoked function expression)가 호출되는 즉시 소멸함과 동시에 자신이 생성됐을 때의 렉시컬 환경의 변수 counter를 1 증가시키는 함수를 반환한다. 이 함수는 자신이 생성됐을 때의 렉시컬 환경을 기억하는 클로저다.

클로저를 변수 increase에 할당하여 호출 가능하고, 이 클로저는 자신이 선언됐을 때의 렉시컬 환경인 지역변수 counter를 기억하고 참조하여 클로저 함수가 소멸될때 까지 유지시킨다.

또한 즉시실행함수는 한번만 실행되므로 increase가 호출될 때마다 counter가 재차 초기화될 일도 없고 외부에서 직접 접근할 수 없는 private 변수이므로 저역 변수를 사용했을 때와 같이 의도되지 않은 변경을 걱정할 필요도 없다.

> 변수의 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근복적 원인이 될 수 있다.
상태 변경이나 가변 데이터를 피하고 불변성을 지향하는 함수형 프로그래밍에서 부수 효과를 최대한 억제하여 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.
> 

### 2.2.4 함수형 프로그래밍에서 클로저를 활용하는 예제

```jsx
// 함수를 인자로 전달받고 함수를 반환하는 고차 함수
// 이 함수가 반환하는 함수는 클로저로서 카운트 상태를 유지하기 위한 자유 변수 counter을 기억한다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  var counter = 0;
  // 클로저를 반환
  return function () {
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인자로 전달받아 함수를 반환한다
const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

함수 makeCounter는 보조 함수를 인자로 전달 받고 함수를 반환하는 고차 함수이다. 
인자로 전달받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있다.
반환되는 함수는 자신이 생성됐을 때의 렉시컬 환경인 함수 makeCounter의 스코프에 속한 변수 counter를 기억하는 클로저다.

참고로 makeCounter를 호출해 반환된 클로저 함수는 자신만의 독립된 렉시컬 환경을 갖는다. 이는 함수를 호출할 때마다 새로운 렉시컬 환경이 생성된다는 뜻이고 위 예제에서 increaser와 decreaser에 할당된 함수는 각각 독립된 렉시컬 환경을 갖고 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않고 연동되지도 않는다.
독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야한다.

```jsx
const counter = (function () {
  let counter = 0;

  return function (predicate) {
    counter = predicate(counter);

    return counter
  };
}());

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

console.log(counter(increase)); // 1
console.log(counter(increase)); // 2
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

### 2.2.5 모듈 패턴

```jsx
const counter = (function() {
  let _counter = 0;

  function changeBy(val) {
    _counter += val;
  }

  return {
    value: () => {
      return _counter;
    },
    increment: () => {
      changeBy(1);
    },
    decrement: () => {
      changeBy(-1);
    }
  }
})();

console.log(counter.value()); // 0
counter.increment();
counter.increment();
console.log(counter.value()); // 2
counter.decrement();
console.log(counter.value()); // 1
```

## 2.3 정보의 은닉

```jsx
function Counter() {
  // 카운트를 유지하기 위한 자유 변수
  let _counter = 0;
  // this.counter = 0;

  // 클로저
  this.increase = function () {
    return ++_counter;
    // return ++this.counter;
  };

  // 클로저
  this.decrease = function () {
    return --_counter;
    // return --this.counter;
  };
}

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.decrease()); // 0
console.dir(counter)
```

생성자 함수 Counter는 increase, decrease 메소드를 갖는 인스턴스를 생성한다.  이 메소드들은 모두 자신이 생성됐을 때의 렉시컬 환경인 생성자 함수 Counter의 스코프에 속한 변수 counter를 기억하는 클로저이며 렉시컬 환경을 공유한다. 생성자 함수가 생성한 객체의 메소드는 객체의 프로퍼티에만 접근할 수 있는 것이 아니며 자신이 기억하는 렉시컬 환경의 변수에도 접근할 수 있다.

이때 변수 counter는 this에 바인딩된 프로퍼티가 아니라 변수다. counter가 this에 바인딩된 프로퍼티라면 생성자 함수 Counter가 생성한 인스턴스를 통해 외부에서 접근이 가능한 public 프로퍼티가 되지만 외부에서 접근할 수 없다. Counter가 생성한 인스턴스 메소드인 increase, decrease는 클로저이기 때문에 자신이 생성됐을 때의 렉시컬 환경인 생성자 함수 Counter의 변수 counter에 접근할 수 있다. 이런 클로저의 특징을 사용해 클래스 기반 언어의 private 키워드를 흉내낼 수 있다.

```jsx
class Counter {
  #count = 0;

  getCount() {
    console.log(this.#count)
    return this.#count;
  }
}

let counter = new Counter();

console.log(counter)
counter.getCount();
```

# 3. 자주 발생하는 실수

### 의도되지 않은 동작

```jsx
var arr = [];

for (var i = 0; i < 5; i++) {
  arr[i] = function () {
    return i;
  };
}

console.log(`i: ${i}`) // 5

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}
```

var는 function scope이기 때문에 for문에서 var를 사용하면 전역변수로 선언된다.

### 해결법 1

```jsx
var arr = [];

for (var i = 0; i < 5; i++){
  arr[i] = (function (idx) { // 2
    return function () {
      return idx; // 3
    };
  }(i)); // 1
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}
```

클로저를 사용하여 전달인자(idx)로 i 값을 주면 배열에 각 함수가 할당될 때 그 때의 i 값을 매개변수로 받기 때문에 지역변수를 사용한 것 같은 효과가 난다.

### 해결법 2

```jsx
const arr = [];

for (let i = 0; i < 5; i++) {
  arr[i] = function () {
    return i;
  };
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]());
}
```

var 가 function scope 이여서 일어나는 문제기 때문에 block scope 인 let, const 를 사용하면 된다.

### 해결법 3

```jsx
const arr = new Array(5).fill();

arr.forEach((v, i, array) => array[i] = () => i);

arr.forEach(f => console.log(f()));

arr.map(a => a);
```

고차 함수를 사용한다. 변수와 반복문의 사용을 억제해 에플리케이션의 오류를 줄이고 가독성을 좋게 만든다.

## 참조

[http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/)

[https://poiemaweb.com/js-closure](https://poiemaweb.com/js-closure)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)