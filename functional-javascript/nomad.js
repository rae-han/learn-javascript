// 노마드
// 버그 발생이 어려받
// 버그가 쉽게 숨겨지지도 않는다

// 함수형 프로그래밍 개념
// purity
// immutablility
// sideeffects

// 왜 더 좋은가?

// - 명령형 코드 imperative
//   - 원하는 결과를 얻기 위해 필요한 지침에 따라 코드가 작성(1. toast 2. 시금치+토마토+치즈 cut, 3. combine 4. done!!!)
//   - 그 결과값에 어떻게 도달하느냐

// - 선언형 코드 declarative
//   - 원하는 결과를 표현하기 위해 코드가 작성(makde me a sandwich)
//   - ex. css
//   - 원하는 결과값을 선언하는 것

// - 예시 텍스트 무자열에서 공백을 제거하고 하트 이모티콘으로 대체

const text = "Hello Functional JS";

// 명령형 코드
const spaceToHeart1 = (text) => {
  let result = ""; // 1. 최종 결과를 보유할 변수를 만듦

  for(let i = 0; i < text.length; i++) { // 2. 지우려는 텍스트의 각 문자 내부를 살펴봄
    if(text[i] === "") { // 3. 문자의 공백 여부를 확인
      result += "💖" // 4. 확인한 값에 따라 값을 변경
    } else {
      result += text[i];
    }
  }
  return result; // 5. 완료 후 결과를 리턴
}

const spaceToHeart = (text) => {
  return text.replaceAll(" ", "💖")
}

// replaceAll 안에는 명령형 코드가 있을수 있다
// 즉 모든 선언형 코드는 명령형 코드 위에 쓰여진다 말할수 있다

let data = [1, 2, 3]; // 이 값을 각각 *2 하는 코드

// 명령형 코드 
const imperativeFunc = list => {
  let result = [];

  for (let i=0; i < list.length; i++) {
    result.push(list[i]*2);
  }

  return result;
};

console.log(imperativeFunc(data));

// 함수형 코드라고 할수 있지만 조금 아쉬운 선언형 코드
const declarativeFunc = list => {
  return list.map(v => v*2);
}
console.log(declarativeFunc(data));
