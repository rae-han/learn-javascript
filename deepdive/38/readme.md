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

- **HTTP/1.1**
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
- **HTTP/2**
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
        - 예를 들면 클라이언트가 요청을 두 번 보낼 경우 헤더에 중복이 있는 경우 Static/Dynamic Header Table 개념을 이용하여 중복을 검출해 내고 해당 테이블에서의 index값 + 중복되지 않은 Header 정보를 Huffman Encoding 방식으로 인코딩한 데이터를 전송한다.
    - 보안통신 (HTTPS)
        - HTTP/2 는 평문 통신과 보안 통신 모두를 지원한다. 다만 보안 접속을 기본으로 한다.
- **HTTP/3**
    - TCP대신 UDP기반의 QUIC 프로토콜을 사용한 방식
        - TCP vs UDP
            - 연결 방식 - 연결 지향형 프로토콜 : 비 연결 지향형 프로토콜
            - 전송 순서 - 보장 : 보장하지 않음
            - 신뢰성 - 높음 : 낮음
            - 전송속도(상대적) - 느림 : 빠름
            - 혼잡제어 - 가능 : 불가능
            - 헤더크기 - 20바이트 : 8바이트
            

# 3. HTML 파싱과 DOM 생성

브라우저의 요청에 의해 서버가 응답한 HTML 문서는 문자열로 이뤄진 순수한 텍스트인데 이것을 브라우저에서 렌더링하려면 브라우저가 해석할 수 있는 자료구조(객체)로 변환하여 메모리에 저장해야 한다.

브라우저의 렌더링 엔진은 서버로부터 응답받은 HTML 문서를 파싱하여 브라우저가 해석 할 수 있는 자료구조인 DOM(Document Object Model)을 생성한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8004ea58-b41a-4a34-a73a-7f2c09cec3e7/Untitled.png)

1. 브라우저의 요청에 의해 서버에서 HTML 파일이 응답된다. 이때 서버는 브라우저가 요청한 HTML 파일을 읽어 바이트 코드로 메모리에 저장한 다음 인터넷을 경유하여 응답한다.
2. 브라우저가 응답 받은 바이트(2진수) 형태의 HTML 문서는 meta 태그의 charset 어트리뷰트에 의해 지정된 인코딩 방식(ex. UTF-8) 기준으로 문자열로 변환된다.
    - 참고로 meta 태그의 charset 어트리뷰트에 선언된 인코딩 방식은 content-type: text/html; charset=utf-8과 같이 응답 헤더(reponse header)에 담겨 응답되는데 브라우저는 이를 확인하고 문자열로 변환된다.
3. 문자열로 변환된 HTML 문서를 읽어 들여 문법적 의미를 갖는 코드의 최소 단위인 토큰(token)들로 분해한다.
4. 각 토큰들을 객체로 변환하여 노드(node)들을 생성하는데 토큰의 내용에 따라 문서 노드, 요소 노드, 어트리뷰트 노드, 텍스트 노드가 생성된다. 노드는 이후 DOM을 구성하는 기본 요소가 된다.
5. HTML 문서는 HTML 요소들의 집합으로 이루어지며 HTML요소는 중첩 관계를 갖는다. 즉 HTML 요소의 콘텐츠 영역(시작 태그와 종료 태그 사이)에는 텍스트 뿐 아니라 다른 HTML요소도 포함될수 있다. 이때 HTML 요소 간에는 중첩 관계에 의해 부자 관계가 형성된다. 이런 HTML 요소 간의 부자 관계를 반영하여 모든 노드들을 트리 자료구조로 구성하고 이 자료 구조를 DOM(Document Object Model)이라 부른다.

즉 DOM은 HTML 문서를 파싱한 결과물이다.

# 4. CSS 파싱과 CSSDOM 생성

렌더링 엔진은 HTML을 파싱하여 DOM을 생성해 나가다 CSS를 로드하는 link 태그나 style 태그를 만나면 DOM 생성을 일시 중단한다.

그리고 link 태그의 href 어트리뷰트에 지정된 CSS 파일을 서버에 요청하여 로드한 CSS 파일이나 style 태그 내의 CSS를 HTML과 동일한 파싱 과정(바이트 → 문자 → 토큰 → 노드 → CSSOM)을 거치며 해석하여 CSSOM(CSS Object Model)을 생성하고 파싱 완료 후 HTML 파싱이 중단된 시점부터 다시 HTML을 파싱한다.

CSSOM은 CSS의 상속을 반영하여 생성된다. 다만 모든 프로퍼티가 상속 되는건 아니다.

- 상속 되는 프로퍼티: visibility, opacity, font, color, line-height, text-align, white-space 등.
- 상속 되지 않는 프로퍼티: width, height, margin, padding, border, box-sizing, display, background, vertical-align, text-decoration, position, top, right, bottom, left, z-index, overflow, float 등.

### 캐스캐이딩(Cascading)

요소는 하나 이상의 CSS 선언어 영향을 받을 수 있다. 이때 충돌을 피하기 위해 CSS 적용 우선순위가 필요한데 이를 캐스캐이딩(Cascading Order)이라 한다.

1. 중요도:  CSS가 어디에 선언 되었는지에 따라 우선순위가 다르다.
2. 명시도: 대상을 명확하게 특정할수록 명시도가 높아지고 우선순위가 높아진다.
3. 선언순서:나중에 선언된 스타일이 우선 적용된다.

- 중요도
    
    CSS가 어디에 선언되었는지에 따라 우선순위가 달라진다.
    
    1. head 요소 내의  style 요소
    2. head 요소 내의  style 요소 내의 @import 문
    3. <link>로 연결된 CSS파일
    4. <link>로 연결된 CSS 파일 내의 @import 문
    5. 브라우저의 디폴트 스타일시트

- 명시도
    
    대상을 명확하게 특정할수록 명시도가 높아지고 우선순위가 높다.
    
    1. !important
    2. 인라인 스타일
    3. 아이디 선택자
    4. 클래스/어트리뷰트/가상 선택자
    5. 태그 선택자 > 전체 선택자
    6. 상위 요소에 의해 상속된 속성
    
- 선언순서
    
    선언된 순서에 따라 우선 순위가 적용 되는데, 나중에 선언된 스타일이 우선 선언된다.
    

# 5. 렌더 트리 생성

렌더링 엔진은 서보로부터 응답된 HTML, CSS를 파싱하여 각각 DOM, CSSOM을 생성하고 생성한 DOM과 CSSOM은 렌더링을 위해 렌더 트리(render tree)로 결합된다.

렌더 트리는 렌더링을 위한 트리 구조의 자료구조로 브라우저 화면에 렌더링 되는 노드만으로 구성된다. 브라우저 화면에 렌더링되지 않는 노드(ex. meta  태그, script 태그 등)와  CSS에 의해 비표시(ex. display: none)되는 노드들은 포함하지 않는다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fab626bc-24a2-4867-9f46-b309fc30b022/Untitled.png)

이후 완성된 렌더 트리는 각 HTML 요소의 레이아웃을 계산하는 데 사용되며 브라우저 화면에 렌더링하는 페인팅 처리에 입력된다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de43218d-5d34-468a-88f2-30bf09d9407a/Untitled.png)

위의 브라우저 렌더링 과정은 반복해서 실행될 수 있다. 예로 아래의 경우가 있다.

- 자바스크립트에 의한 노드 추가 또는 삭제
- 브라우저 창의 리사이징에 의한 뷰포트(viewport)  크기 변경
- HTML 요소의 레이아웃에 변경을발생시키는 width/height, margin, padding, border, display, position, top/right/bottom/left 등의 스타일 변경.

레이아웃 계산과 페인팅을 다시 실행하는 리렌더링은 비용이 많이 드는, 성능에 악영향을 주는 작업으로 리렌더링이 빈번하게 발생하지 않도록 주의할 필요가 있다.

# 6. 자바스크립트 파싱과 실행

HTML 문서를 파싱한 결과물로 생성된 DOM은 HTML 문서의 구조와 정보뿐만 아니라 HTML 요소와 스타일 등을 변경할 수 있는 프로그래밍 인터페이스로서 DOM API를 제공한다. 즉, 자바스크립트 코드에서 DOM API를 사용하면 이미 생성된 DOM을 동적으로 조작할 수 있다.

CSS 파싱 과정과 마찬가지로 렌더링 엔진은 HTML을 파싱하여 DOM을 생성하다 자바스크립트 파일을 로드하는 script 태그나 자바스크립트 코드를 콘텐츠로 담은 script 태그를 만나면 DOM 생성을 일시 중단한다.

그리고 자바스크립트 코드를 파싱하기 위해 자바스크립트 엔진에 제어권을 넘긴다. 그 후 자바스크립트 파싱과 실행이 종료되면 렌더링 엔진으로 다시 제어권을 넘겨 HTML을 파싱한다.

자바스크립트 파싱과 실행은 브라우저 렌더링 엔진이 아닌 자바스크립트 엔진이 처리한다. 자바스크립트 엔진은 자바스크립트 코드를 파싱하여 CPU가 이해할 수 있는 저수준 언어(low-level language)로 변환하고 실행하는 역할을 한다. 자바스크립트 엔진은 다양한 종류가 있으며 모두 ECMAScript 사양을 준수한다.

자바스크립트 엔진은 자바스크립트 코드를 파싱하는데 HTML, CSS를 파싱하여 DOM, SCCOM을 생성하듯 자바스크립트 엔진은 자바스크립트를 실행하여 AST(Abstract Syntax Tree) 를 생성한다. 그리고 AST를 기반으로 인터프리터가 실행 할 수 있는 중간 코드(intermediate code)인 바이트코드를 생성하여 실행한다.

자바스크립트 코드 → (자바스크립트 엔진) → 바이트 코드 → (가상머신) → 기계어

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2454bfa-4711-4e42-ac4e-f66f85c0d30c/Untitled.png)

### 토크나이저

자바스크립트 코드를 분석하여 '의미를 갖는 최소 단위'인 토큰으로 분해하고 이 과정을 토크나이징이라 부른다. 이 과장을 렉싱이라 부르기도 하지만 토크나이징과 미묘한 차이가 있다.

### 파서

토큰들의 집합을 구문 분석하여 문법적으로 의미를 갖는 AST(추상적 구문 트리)를 생성하고 이 과정을 파싱이라 한다.

AST는 토큰에 문법적 의미와 구조를 반영한 트리 구조의 자료구조이며, 인터프리터나 컴파일러만이 사용하는 것은 아니다. AST를 사용하면 TypeScript, Babel, Prettier 같은 트랜스파일러를 구현할 수도 있다.  AST Explorer 웹사이트에 방문하면 다양한 오픈소스 자바스크립트 파서를 사용하여 AST를 생성해 볼 수 있다.

### 인터프리터

파싱된 결과물인 AST를 byte code로 변환한다.

### 바이트코드 생성과 실행

파싱의 결과물로 생성된 AST는 인터프리터가 실행할 수 있는 중간 코드인 바이트코드로 변환되고 인터프리터에 의해 실행된다. V8 엔진의 경우 자주 사용되는 코드는 터보팬이라 불리는 컴파일러에 의해 최적화된 머신 코드로 컴파일되어 성능을 최적화하고 코드의 사용 빈도가 적어지면 다시 디옵티마이징하기도 한다.

# 7. 리플로우(reflow)와 리페인트(repaint)

자바스크립트 DOM API를 이용하여 DOM, CSSOM을 변경할 경우, 변경된 DOM, CSSOM은 다시 렌더 트리로   결합되고 변경된 렌터 트리를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우저의 화면에 다시 렌더링한다. 이를 리플로우, 리페인트라 한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4161a6d3-3b0d-4d42-bc76-0026869a57c0/Untitled.png)

리플로우는 레이아웃 계산을 다시 하는 것으로, 노드 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등 레이아웃에 영향을 주는 변경이 발생한 경우에 실행된다.

리페인트는 재결합된 렌더 트리를 기반으로 다시 페인팅 하는 것을 말한다.

리플로우와 리페인트가 반드시 순차적으로 동시에 싱행되는 것은 아니며 레이아웃에 영향이 없는 변경은 리플로우 없이 리페인트만 실행된다.

브라우저 엔진 별로 layout, paint, composite를 발생시키는 css 프로퍼티가 다르다([https://csstriggers.com/](https://csstriggers.com/), webkit-safari, blink-chrome, gecko-firefox).

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4fb673ef-d20d-41fc-8dac-60d3ee21e8ca/Untitled.png)

참고로 레이아웃 단계와 페인트 단계는 오버헤드가 큰 작업이다. 그래서 React, Vue는 Virtual DOM을 사용하여  Angular 같은 경우는 Incremntal DOM 을 사용하여 이 문제를 해결하였다.

# 8. 자바스크립트 파싱에 의한  HTML 파싱 중단

렌더링 엔진과 자바스크립트 엔진은 병렬적으로 파싱을 실행하지 않고 직렬적으로 파싱을 수행한다.

브라우저는 동기적, 즉 순차적으로 HTML, CSS, Javascript를 파싱하고 실행하므로 script 태그의 위치에 따라 HTML 파싱이 블로킹되어 DOM 생성이 지연될 수 있다는 것을 의미한다.

또한 DOM을 변경하는 DOM API를 사용할 때 DOM의 생성이 완료되지 않은 상태라면 문제가 발생할 수 있다.

이런 문제를 회피하기 위해 자바스크립트를 body 요소의 가장 아래에 위치시키는데 아래와 같은 이유가 있다.

1. DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작하면 에러가 발생할 수 있다.
2. 자바스크립트 로딩/파싱/실해으로 인해 HTML 요소들의 렌더링에 지장받는 일이 발생하지 않아 페이지 로딩 시간이 단축된다.

# 9. script 태그의 async/defer 어트리뷰트

자바스크립트 파싱에 의한 DOM 생성이 중단(blocking)되는 문제를 근본적으로 해결하기 위해 HTML5부터 script 태그에 async, defer 어트리뷰트가 추가됐다.

async, defer 어트리뷰트는 src 어트리뷰트를 통해 외부 자바스크립트 파일을 로드하는 경우만 사용할 수 있다.

### async

HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다. 단 자바스크립트의 파싱과 실행은 자바스크립트 파일의 로드가 완료된 직후 진행되며, 이때 HTML 파싱이 중단된다.

여러 개의  script 태그에 async를 지정하면 script 태그의 순서와는 상관없이, 로드가 완료된 자바스크립트부터 먼저 실행되므로 순서가 보장되 않는다. 순서 보장이 필요한 script 태그에는 async 어트리뷰트를 지정하지 않아야한다.

방문자 수 카운터나광고 관련 스크립트같이 독립적인 스크립트에 혹은 실행 순서가 중요하지 않은 경우에 적용한다.

### defer

HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다. 단, 자바스크립트의 파싱과 실행은 HTML 파싱이 완료된 직후, 즉 DOM 생성이 완료된 직후(DOMContentLoaded 이벤트 발생 전) 진행된다.

→ DOMContentLoaded는 document만 완료되면 실행, load는 css나 이미지 같은 것들 다 받은 후 실행.

DOM 생성이 완료된 이후 실행되어야 할 자바스크립트에 유용하다.

문서에 추가된 순서대로 실행된다.

## 9.1. 동적 스크립트(dynamic script)

스크립트를 동적으로 추가 하는 것을 동적 스크립트라 부르고 기본적으로 async 어트리뷰터가 있는 것처럼 행동한다.

async의 특성과 같이 어떤 것도 기다리지 않고 어떤 것도 스크립트를 기다리지 않기 때문에 먼저 다운로드된 스크립트가 먼저 실행된다.

순서가 중요하다면 반드시 async 어트리뷰트를 false로 설정해 줘야한다.

```jsx
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

loadScript("/article/script-async-defer/long.js"); // 크기가 큰 파일
loadScript("/article/script-async-defer/small.js"); // 크기가 작은 파일
```

## 9.2. 정리

### 9.2.1. head  안에 일반 스크립트

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <script src="main.js"></script>
</head>
<body>
</body>
</html>
```

- 로드 순서
    
    HTML 파싱 → JS파일 발견 → HTML 파싱 멈춤 → JS 패칭 → JS 실행 → 다시 HTML 파싱
    
- 장점
    
    상황에 따라 페이지를 보여주지 말아야 할 때 적은 네트워크 자원으로 가능하다.
    
- 단점
    
    JS파일의 크기가 크거나, 인터네싱 느리면 사용자가 웹사이트를 보기까지 오래 걸린다.
    

### 9.2.2. body 끝에 일반 스크립트

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
  <script src="main.js"></script>
</body>
</html>
```

- 로드 순서
    
    BODY 태그 끝까지 HTML 파싱 → JS파일 발견 → JS 패칭 → JS 실행
    
- 장점
    
    HTML 컨텐츠를 빠르게 본다는 장점
    
- 단점
    
    의미있는 컨텐츠가 JS파일에 의존적이면 사용자가 기다려야 한다.
    

### 9.2.3. head 안에 async를 사용한 스크립트

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <script async src="main.js"></script>
</head>
<body>
</body>
</html>
```

- 로드 순서
    
    HTML 파싱 + JS파일 패칭 → JS파일 패칭 완료 → HTML 파싱 멈춤 → JS파일 실행 → 다시 HTML 파싱
    
- 장점
    
    HTML 파싱과 JS 패칭이 병렬적으로 일어나서 다운로드 시간을 줄인다.
    
- 단점
    
    JS가 HTML이 파싱되기도 전에 실행돼서 JS파일과 관련된 HTML의 요소가 파싱되지 않아 정의 되지 않았을 경우 페이지 로드의 위험이 있다.
    
    JS파일의 실행 순서를 보장하지 않는다
    

### 9.2.4. head 안에 defer를 사용한 스크립트

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
  <script defer src="main.js"></script>
</head>
<body>
</body>
</html>
```

- 로드 순서
    
    HTML 파싱 + JS 패칭 → HTML 파싱 완료 → 패칭된 JS파일 실행
    
- 장점
    
    HTML 파싱과 JS패칭이 병렬로 수행됨.
    
    여러 JS파일을수행 할 경우, 패칭을 병렬로 동시에 일어나고, 실행의 순서는 절차적으로 수행된다.
    

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f10d629-6c9c-4ec1-8c64-8951ae13dab6/Untitled.png)

# 10. 웹페이지를 방문할 때 일어나는 과정.

1. 브라우저에 도메인을 입력한다.
2. 네임서버에서 해당 도메인에 해당하는 IP를 가져온다.
3. 해당 IP주소에 해당하는 서버 컴퓨터(웹서버)에 요청한다.
4. 웹서버는 요청에 해당되는 응답을 저장장치 or 다른 서버로의 요청와 응답에서 구한 후 응답한다.
5. 만약 응답 온 리소스가 HTML, CSS 문서라면, 브라우저의 렌더링 엔진은 해당 문서를 파싱하여 토큰으로 분해하고 해당 토큰을 트리 구조의 파스 트리로 만든다.
6. 중간에 자바스크립트 코드를 만난다면 렌더링 엔진은 잠시 멈추고 자바스크립트 엔진이 자바스크립트 해석한다.
7. 자바스크립트 역시 토크나이저를 통해 토큰으로 변환 후 토큰을 파싱하여 문법적 의미를 갖는 AST를 만든 후, AST를 인터프리터가 해석 가능한 바이트 코드로 변환한다.
8. 렌더 트리를 기반으로 레이아웃을 계산하고 브라우저 화면에 페인팅한다.

# ref. 참조

[https://seokbeomkim.github.io/posts/http1-http2/#server-push](https://seokbeomkim.github.io/posts/http1-http2/#server-push)

[https://withbundo.blogspot.com/2021/08/httphttp2-http2.html](https://withbundo.blogspot.com/2021/08/httphttp2-http2.html)

[https://yceffort.kr/2021/05/http1-vs-http2](https://yceffort.kr/2021/05/http1-vs-http2)

[https://cottonblue.tistory.com/29](https://cottonblue.tistory.com/29)

[https://velog.io/@zzzz465/HTTP1.1-2-3-의-차이점](https://velog.io/@zzzz465/HTTP1.1-2-3-%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)

[https://ijbgo.tistory.com/26](https://ijbgo.tistory.com/26)

[https://woojinger.tistory.com/85](https://woojinger.tistory.com/85)