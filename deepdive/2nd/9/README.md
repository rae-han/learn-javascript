# 9. 타입 변환과 단축 평가

개발자가 의도적으로 타입을 변환하는 것을 명시적 타입 변환, 타입 캐스팅이라 한다.

엔진에 의해 암묵적으로 타입이 자동 변환되는 것을 암묵적 타입 변환, 타입 강제 변환이라 한다.

명시적 타입 변환, 암묵적 타입 변환 둘 다 기존 원시 값을 직접 변경하는 것이 아니다. 원시 값은 변경 불가능한 값이므로 변경할 수 없고 기존 원시 값을 사용해 다른 타입의 새로운 원시 값을 생성하는 것이다.

명시적 타입 변환은 타입을 변경하겠다는 개발자의 의도가 코드에 명백히 들어나고, 표현식이 어떻게 평가될 것인지 예측 가능하므로 오류를 생산할 가능성이 낮아진다.

다만 자바스크립트를 잘 이애하고 있는 개발자에게는 `(10).toString()` 보다 `10+’’`이 더욱 간결하고 이해하기 쉬울수도 있다.

# 9.3. 명시적 타입 변환

## 9.3.1. 문자열 타입으로 변환

1. String() 생성자 함수를 new 연산자 없이 호출
2. Object.prototype.toString 메서드를 사용
3. 문자열 연결 연산자를 이용하는 방법

## 9.3.2. 숫자 타입으로 변환

1. Number 생성자 함수를 new 연산자 없이 호출
2. parseInt, parseFloat 함수를 사용(문자열만 숫자 타입으로 변환 가능)
3. + 단항 산술 연산자를 이용
4. * 산술 연산자를 이용

## 9.3.3. 불리언 타입으로 변환

1. Boolean 생성자 함수를 new 연산자 없이 호출
2. ! 부정 논리 연산자를 두 번 사용