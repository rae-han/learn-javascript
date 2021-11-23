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

만약 해당 index.html 에서 다른 정적 파일을 서버에 요청하려면 정적 파일의 경로를 host뒤 pathname에 기술하여 서버에 요청하면 된다.

추가로 자바스크립트를 통해 동적으로 데이터를 요청할 수도 있다.

요청과 응답은 개발자 도구의 Network 패널에서 확인 가능하다. 다만 패널 활성화 전 응답 받은 경우에는 리소스가 표시되지 않는다.

추가로 index.html 외 다른 응답 파일들은 브라우저 렌더링 엔진이 HTML(index.html)을 파싱하는 도중 외부 리소스를 로드하는 태그를 만나면 HTML 파싱을 일시 중단하고 해당 리소스 파일을 서버로 요청한 것들이다.

# 2. HTTP 1.1과 HTTP 2.0

HTTP(HyperText Transfer Protocol)는 웹에서 브라우저와 서버가 통신하기 위한 프로토콜이다.

- HTTP/1.1
    - 기본적으로 커넥션당 하나의 요청과 응답만 처리한다. 즉, 여러 개의 리소스 요청이 개별적으로 전송되고 응답 또한 개별적으로 전송된다. 이처럼 HTTP/1.1은 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례하여 응답 시간도 증가한다.
    - HOL(head of line) Blocking 특정 응답 지연
        - 작업 하나가 끝날 때 까지 멈춰있는 현상
    - RTT(round trip time) 증가
        - 요청별로 connection을 만들게 되고 , TCP 상에서 동작하는 HTTP의 특성상 3-way Handshake가 반복적으로 일어나 불필요하게  RTT가 증가한다.
    - 무거운 Header 구조
        - http/1.1 헤더에는 많은 메타 정보를 저장한다.
        - domain sharding을 하지 않았을 경우 매 요청시 중복된 Header 값을 전공하게 되며 여기엔 도메인에 설정된 쿠키 정보도 포함된다.(쿠기 정보가 크다.)
        - 전송하려는 값보다 헤더 값이 큰 경우도 자주 발생한다.
    - 단점 극복 방법
        - Image Spriting:  큰 이미지 파일을 잘라서 쓰는 것.
        - Domain Sharding: 다수의  connection을 생성 해 병렬로 요청을 보내는 것. 브라우저 별로 갯수 제한이 있다.
        - Minify: 코드 자체를 축소 하는 것.
        - Data URI Scheme: 이미지 리소스를 Base64로 인코딩된 이미지 데이터로 직접 기술하는 방식
        - Load Faster: 스타일 시트는 문서 상단에 스크립트는 문서 하단에 배치

- HTTP/2
    - HTTP/2는 다중 요청/응답이 가능하다. 리소스의 동시 전공이 가능하므로 HTTP/1.1에 비해 페이지 로드 속도가 빠르다.
    - Multiplexed Streams
        - 한 커넥션으로 여러 개의 메세지를 주고 받을수 있으며, 요청 순서 상관 없이 빠른 것 부터 응답받는다.
        - HTTP/1.1의 Connection keep-alive, pipelining의 개선.
    - Stream Prioritization
        - 클라이언트가 요청한 HTML 문서 안에 CSS파일 1개와 Image파일 2개가 존재하여 클라이언트가 각각 요청 했을때 Image파일보다 CSS파일의 수신이 늦어지는 경우 브라우저의 렌더링이 늦어지는 문제가 발생한다.
        - HTTP/2의 경우 리소스간 의존관계(우선순위)를 설정하여 문제를 해결한다.
    - Server Push
        - 서버는 클라이언트가 필요로 하지만 요청하지 않은 리소스를 사전에 푸쉬를 통해 전송할수 있다.
        - 예를 들면 클라이언트가 HTML 문서를 요청할 때 해당 문서 내의 리소스를 사전에 클라이언트에서 다운로드할 수 있도록 하여 클라이언트의 요청을 최소화 한다.
        - PUSH_PROMISE 라고 부르며 이를 통해 서버가 전송한 리소스에 대해선 클라이언트는 요청을 하지 않는다.
    - Header Compression
        - HTTP/2는 헤더 정보를 압축하기 위해 Header Table과 Huffman Encoding 기법을 사용하여 처리하는데 이를 HPACK 압축방식이라 부르며 별도의 명세서(RFC 7531)로 관리하고 있다.
        -