// console.log(regExp.test(testcase));

// * https:// or http:// 로 시작하는지 검사
const testcase1 = "https://example1.com";
const testcase2 = "http://example2.com";

const regExp1 = /^https?:\/\//;
const regExp2 = /^(http||https):\/\//;

console.log(regExp1.test(testcase1));
console.log(regExp1.test(testcase2));
console.log(regExp2.test(testcase1));
console.log(regExp2.test(testcase2));

// * .html 로 끝나는지 검사
const testcase3 = "index.html";

const regExp3 = /.html$/;

console.log(regExp3.test(testcase3));

// * 숫자로만 이뤄진 문자열인지 검사
const testcase4 = '1234567890';
const testcase5 = 'qwer1234asdf';
const testcase6 = '1234qwer1234';

const regExp4 = /^\d+$/;

console.log(regExp4.test(testcase4));
console.log(regExp4.test(testcase5));
console.log(regExp4.test(testcase6));
console.log(testcase4.match(regExp4));
console.log(testcase5.match(regExp4));
console.log(testcase6.match(regExp4));

// * 하나 이상의 공백으로 시작하는지 검사
const regExp5 = /^[\s]+/;

// * 아이디로 사용 가능한지 검사 (알파벳 대소문자 + 숫자 시작하고 끝나며 4~10자리);
const regExp6 = /^[A-Za-z\d]{4,10}$/;
const regExp7 = /^[A-Za-z0-9]{4,10}$/;

const testcase7 = 'abc123';
console.log(regExp6.test(testcase7));
console.log(regExp7.test(testcase7));

// * 메일 형식에 맞는지 검사
const regExp8 = /^[A-Za-z0-9._]+@[A-Za-z0-9]+(\.[a-zA-Z]{2,2})*\.[A-Za-z]+$/;
// 

const testcase8 = "raehan900809@gmail.com";
const testcase9 = "jrh900809@naver.co.kr";

console.log(regExp8.test(testcase8));
console.log(regExp8.test(testcase9));

// * 핸드폰 번호 형식에 맞는지 검사
const regExp9 = /01[0-9]-?[0-9]{3,4}-?[0-9]{4}/;
const regExp10 = /01\d-?\d{3,4}-?\d{4}/;
const testcase10 = "01071121906";
const testcase11 = "010-7112-1906";

console.log(regExp9.test(testcase10));
console.log(regExp9.test(testcase11));
console.log(regExp10.test(testcase10));
console.log(regExp10.test(testcase11));

// * 특수문자가 있는지 검사
const target9 = "abc@123";
const regExp11 = /^[0-9a-zA-Z]/;

console.log(regExp11.test(target9));




