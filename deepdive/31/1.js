const tel = '010-7112-1906';

const regExpTel = /^\d{3}-\d{4}-\d{4}/;

console.log(regExpTel.test(tel));

const testTarget = 'Is this all there is?';
const testRegExp1 = /is/;
const testRegExp2 = /is/g;

console.log(testRegExp1.exec(testTarget));
// [ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
console.log(testRegExp2.exec(testTarget));
// [ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]

console.log(testRegExp1.test(testTarget)); // true

console.log(testTarget.match(testRegExp1));
// [ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
console.log(testTarget.match(testRegExp2));
// [ 'is', 'is' ]

// * flag

// # i
// - 대소문자 구별 x

// # g
// - 패턴과 일치하는 모든 문자열을 전역 검색

// # m
// - 문자열의 행이 바뀌더라도 패턴을 계속 검색

// * pattern

let target1 = 'A AA B BB Aa Bb AAA';

// # .
// - 임의의 문자 한 개
console.log(target1.match(/.../g)); // [ 'A A', 'A B', ' BB', ' Aa', ' Bb', ' AA' ]

// # {m,n}, {n} === {n,n}
// - 최소 m번, 최대 n번 반복되는 문자열
console.log(target1.match(/A{1,2}/g)) // [ 'A', 'AA', 'A', 'AA', 'A' ]

// # {n,}
// - 앞선 패턴이 최소 n번 반복
console.log(target1.match(/A{1,}/g)); // [ 'A', 'AA', 'A', 'AAA' ]

// # +
// - 앞선 패턴이 최소 한번 이상 반복되는 문자열 == {1,}
console.log(target1.match(/A+/g)); // [ 'A', 'AA', 'A', 'AAA' ]

// # ?
// - 앞선 패턴이 최대 한번(0~1) 반복되는 문자열 == {0,1}
const target2 = "color colour";
const regExp2 = /colou?r/g;
console.log(target2.match(regExp2)); // [ 'color', 'colour' ]

// # |
// - or 의 의미를 갖는다.
console.log(target1.match(/A|B/g)); // ['A', 'A', 'A', 'B', 'B', 'B', 'A', 'B', 'A', 'A', 'A']

// 분해되지 않은 단어 레벨로 검색하려면 +를 함께 사용한다.
console.log(target1.match(/A+|B+/g)); // ['A', 'AA', 'B', 'BB', 'A', 'B', 'AAA']

// # []
// - [] 안의 문자는 or로 동작한다.
console.log(target1.match(/[AB]+/g)); // ['A', 'AA', 'B', 'BB', 'A', 'B', 'AAA']

// # [-]
// - []  안의 - 는 범위다.
const target3 = 'A AA BB ZZ Aa Bb';
console.log(target3.match(/[A-Z]+/g)); // [ 'A', 'AA', 'BB', 'ZZ', 'A', 'B' ]

// 대소문자 구별 안하고 검색하는 법
const target4 = 'AA BB Aa Bb 12';
console.log(target4.match(/[A-Za-z]+/g)); // [ 'AA', 'BB', 'Aa', 'Bb' ]
console.log(target4.match(/[A-Z]+/ig)); // [ 'AA', 'BB', 'Aa', 'Bb' ]

// 숫자 검색하는 법
const target5 = "A B 12,345";
console.log(target5.match(/[0-9]+/g)); // [ '12', '345' ]
console.log(target5.match(/[0-9,]+/g)); // [ '12,345' ]
