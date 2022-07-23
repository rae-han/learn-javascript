<<<<<<< HEAD
=======
# 10. 객체 리터럴

>>>>>>> aa9b459b602ac8a04fc3c310952a9e61136a5cfa
자바스크립트는 객체 기반의 프로그래밍 언어이며, 자바스크립트를 구성하는 거의 모든 것이 객체다.

원시 타입은 단 하나의 값만 나타내지만, 객체 타입은 다양한 타입의 값을 하나의 단위로 구성한 복합적인 구조다. 또한 원시 타입의 값, 즉 원시 값은 변경 불가능한 값이지만, 객체 타입의 값인 객체는 변경 가능한 값이다.

객체는 0개 이상의 프로퍼티로 구성된 집합이며, 프로퍼티는 키와 값으로 구성된다. 자바스크립트의 함수는 일급 객체이므로 값으로 취급 받을 수 있어 프로퍼티 값으로 사용할 수 있는데 일반 함수와 구분하기 위해 메서드라 부른다.

즉 객체는 프로퍼티(객체의 상태를 나타내는 값)과 메서드(프로퍼티를 참조하고 조작할수 있는 동작)로 구성된 집합체다.

<aside>
💡 # 객체와 함수
자바스크립트의 객체는 함수와 밀접한 관계를 가진다. 함수로 객체를 생성하기도 하며, 함수 자체가 객체이기도 하다.

</aside>

# 10.2. 객체 리터럴에 의한 객체 생성

<aside>
💡 인스턴스
인스턴스란 클래스에 의해 생성되어 메모리에 저장된 실체를 말한다. 객체지향 프로그래밍에서 객체는 클래스와 인스턴스를 포함한 개념으로 클래스는 인스턴스를 생성하기 위한 템플릿 역할을 한다. 인스턴스는 객체가 메모리에 저장되어 실제로 존재하는 것에 초점을 맞춘 용어다.

</aside>

자바스크립트는 프로토타입 기반 객체지향 언어로 클래스 기반 객체지향 언어와는 달리 다양한 객체 생성 방법을 지원한다.

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create aptjem
- 클래스(ES6)

객체 리터럴의 중괄호는 코드 블록을 의미하지 않는다. 객체 리터럴을 자바스크립트의 유연함과 강력함을 대표하는 객체 생성 박식으로, 객체를 생헝하기 위해 클래스를 먼저 정의하고 new 연산자와 함께 생성자를 호출할 필요가 없다.

# 10.3. 프로퍼티

객체는 프로퍼티의 집합이며, 프로퍼티는 키와 값으로 구성된다.

프로퍼티 키는 프로퍼티 값에 접근할 수 있는 이름으로 식별자 역할을 한다. 반드시 식별자 네이밍 규칙을 따라야 하진 않지만, 식별자 네이밍 규칙을 따르지 않는 이름에는 반드시 따옴표를 사용해야 한다. 그래서 가급적 식별자 네이밍 규칙을 준수하는 프로퍼티 키를 사용할 것을 권장한다.

프로퍼티 키는 문자열 또는 문자열로 평가할 수 있는 표현식을 사용해 프로퍼티 키를 동적으로 생성할 수 도 있는데, 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야한다.

# 10.4. 메서드

프로퍼티 값이 함수일 경우 일반 함수와 구분하기 위해 메서드라 부른다. 메서드 내부에서 사용한 this 키워드는 객체 자신을 가리키는 참조변수다.

# 10.5. 프로퍼티 접근

프로퍼티에 접근하는 방법은 마침표 표기법과 대괄호 표기법이 있다.

# 10.8. 프로퍼티 삭제

delete 연산자는 객체의 프로퍼티를 삭제한다.

# 10.9. ES6에서 추가된 객체 리터럴의 확장 기능

## 10.9.1. 프로퍼티 축약 표현

ES6 에서는 프로퍼티 값으로 변수를 사용하는 경우 변수 이름과 프로퍼티 키가 동일한 이름일 때 프로퍼티 키를 생략 할 수 있다.

## 10.9.2. 계산된 프로퍼티 이름

프로퍼티 키를 동적으로 생성할 때 키로 사용할 표현식을 대괄호로 묶어 사용해야 한다. ES6에서는 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성하려면 객체 리터럴 외부에서 대괄호 표기법을 사용해야 하지만, ES6부터는 객체 리터럴 내부에서도 계산된 프로퍼티 이름으로 프로퍼티 키를 동적 생성할 수 있다.

## 10.9.3. 메서드 축약 표현

<<<<<<< HEAD
ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당한다. ES6에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다. 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다.

```jsx
const obj = {
	name: 'raehan',
	sayHello: function() { console.log(`Hello! ${this.name}`) },
	sayHi() {
		console.log(`Hi! ${this.name}`)
	},
}
```
=======
ES5에서 메서드를 정의하려면 프로퍼티 값으로 함수를 할당한다. ES6에서는 메서드를 정의할 때 function 키워드를 생략한 축약 표현을 사용할 수 있다. 메서드 축약 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작한다.
>>>>>>> aa9b459b602ac8a04fc3c310952a9e61136a5cfa