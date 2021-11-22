구글의 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경인 Node.js의 등장으로 자바스크립트는 범용 개발 언어가 됐지만 여전히 웹 브라우저 환경에서 가장 많이 사용된다.

대부분의 프로그래밍 언어는 운영체제나 가상 머신 위에서 실행되지만 클라이언트 자바스크립트는 브라우저 환경에서 HTML, CSS와 함께 실행되기에 브라우저 환경을 고려하면 더 효율적인 프로그래밍이 가능하다.

브라우저가 HTML, CSS, Javascript로 작성된 텍스트 문서를 파싱하고 렌더링 하는 과정은 아래와 같다.

> (참고)파싱과 랜더링.
> 
> - 파싱(parsing)
>     
>     파싱(구문 분석, syntax analysis)은 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서의 문자열을 토큰(token, 문법적으로 더는 나눌 수 없는 코드의 기본 요소)으로 분해(어휘 분석, exical analysis)하고, 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스 트리를 생성하는 일련의 과정을 말한다.
>     일반적으로 파싱이 완료된 이후에는 파스 트리를 기반으로 중간 언어인 바이트코드를 생성하고 실행한다.
>     
> - 랜더링(rendering)
>     
>     랜더링은 HTML, CSS, Javascript로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것.
>     

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/19129b41-1dbb-4c98-b48c-4d43ee506817/Untitled.png)

1. 브라우저는 렌더링에 필요한 리소스를 요청하고 서버로부터 응답을 받는다.
2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML, CSS를 파싱하여 DOM과 CSSOM을 생성하고 이들을 결합하여 렌더 트리를 생성한다.
3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST(Abstract Syntax Tree)를 생성하고 바이트코드로 변환하여 실행한다. 이때 자바스크립트는 DOM API를 통해 DOM, CSSOM을 변경할 수 있다. 변경된 DOM, CSSOM은 다시 렌더 트리로 결합된다.
4. 렌더트리를 기반으로 HTML 요소의 레이아웃을 계산하고 브라우저 화면에 HTML 요소를 페인팅한다.

# 1. 요청과 응답

브라우저의 핵심 기능은 필요한 리소스를 서버에 요청하고 서버로부터 응답받아 브라우저에 시각적으로 렌더링 하는 것이다.

서버에 요청을 전송하기 위해 브라우저는 주소창을 제공한다. 주소창에 URL을 입력하고 엔터키를 누르면 URL의 호스트 이름이 DNS를 통해 IP 주소로 변환되고 이 IP 주소를 갖는 서버에게 요청을 전송한다

![URL(Uniform Resource Identifier) - 위: 기존 노드의 url 구분 방법, 아래: WHATWG의 구분 방법.
책에서는 scheme(=protocol), domain(=host)이 같다하고 hash 대신 fragment 라는 용어를 사용하였다.
또한 전체를 URI로 부르고 protocol~pathname은 URL(Uniform Resource Locator), hostname~hash는 URN(Uniform Resource Name)이라 한다.](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea3cf8c8-08a3-4068-8cab-ba9147ee6d46/Untitled.png)

URL(Uniform Resource Identifier) - 위: 기존 노드의 url 구분 방법, 아래: WHATWG의 구분 방법.
책에서는 scheme(=protocol), domain(=host)이 같다하고 hash 대신 fragment 라는 용어를 사용하였다.
또한 전체를 URI로 부르고 protocol~pathname은 URL(Uniform Resource Locator), hostname~hash는 URN(Uniform Resource Name)이라 한다.

예를 들어, 브라우저 주소창에 [https://poiemaweb.com](https://poiemaweb.com)을 입력하고 에너키를 누르면 루트 요청(= /, 스킴과 호스트만으로 구성된 URI에 의한 요청)이 poiemaweb.com 서버로 전송된다. 루트 요청에 명확히 리소스를 요청하는 내용이 없다면 암묵적으로 index.html을 응답하도록 기본 설정되어 있다.