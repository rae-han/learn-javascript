자바스크립트는 웹 브라우저 뿐 아니라 구글의 V8 자바스크립트 엔진으로 빌드된 Node.js 같은 런타임 환경으로 인해 범용 개발 언어가 되었다. 하지만 아직 웹 브라우저 환경인 클라이언트 사이드에서 가장 많이 사용된다.

대부분의 프로그래밍 언어는 OS나 VM 위에서 실행되지만 클라이언트 자바스크립트는 브라우저에서 HTML, CSS와 함께 실행된다.

---

### 파싱과 렌더링

<aside>
💡 파싱
브라우저가 코드를 이해하고 사용할 수 있는 구조로 변환하는 것. 파싱 결과는 보통 문서 구조를 나태내는 노드 트리로 파싱 트리 또는 문법 트리라 부른다.

</aside>

<aside>
💡 렌더링
렌더링은 HTML, CSS, JS로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것.

</aside>

---

### 브라우저 렌더링 과정 요약

1. 브라우저는 렌더링에 필요한 리소스(HTML, CSS, JS, 이미지, 폰트 파일 등)를 요청하고, 서버로부터 응답을 받는다.
2. 브라우저 렌더링 엔진은 서버로부터 응답된 HTML, CSS를 파싱하여 DOM, CSSOM을 생성하고 이들을 결합하여 렌더 트리를 생성한다.
3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST(Abstract Syntax Tree)를 생성하고 바이트코드로 변환하여 실행한다. 이때 자바스크립트는 DOM API를 통해 DOM, CSSOM을 변경할 수 있다. 변경된 DOM, CSSOM은 다시 렌더 트리로 결합된다.
4. 렌터트리를 기반으로 HTML 요소의 레이아웃을 계산하고 브라우저 화면에 HTML 요소를 페인팅한다.

# 38.1. 요청과 응답

브라우저의 핵심 기능은 필요한 리소스를 서버에 요청하고 서버로부터 응답받아 브라우저에 시각적으로 렌더링 하는 것이다.

주소창에 URL을 입력하면 URL의 hostname이 DNS를 통해 IP 주소로 변환되고 이 IP주소를 갖는 서버에게 요청을 하고 응답을 받는다.

![URL(Uniform Resource Identifier)
위: 기존 노드의 url 구분 방법
아래: WHATWG의 구분 방법
scheme(=protocol), domain(=host)이 같다하기도 하고 hash 대신 fragment 라는 용어를 사용하기도 한다.
또한 전체를 URI로 부르고 protocol~pathname은 URL(Uniform Resource Locator), hostname~hash는 URN(Uniform Resource Name)이라 한다.](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea3cf8c8-08a3-4068-8cab-ba9147ee6d46/Untitled.png)

URL(Uniform Resource Identifier)
위: 기존 노드의 url 구분 방법
아래: WHATWG의 구분 방법
scheme(=protocol), domain(=host)이 같다하기도 하고 hash 대신 fragment 라는 용어를 사용하기도 한다.
또한 전체를 URI로 부르고 protocol~pathname은 URL(Uniform Resource Locator), hostname~hash는 URN(Uniform Resource Name)이라 한다.

# 38.2. 브라우저의 기본 구조

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6ff03fde-ae37-48a3-9419-c6f3548aebc7/Untitled.png)

- 사용자 인터페이스 - 주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등. 요청한 페이지를 보여주는 창을 제외한 나머지 모든 부분.
- 브라우저 엔진 - 사용자 인터페이스와 렌더링 엔진 사이의 동작을 제어.
- 렌더링 엔진 - 요청한 콘텐츠를 표시. 서버에 요청을 하면 HTML, CSS를 파싱하여 화면에 표시함.
- 통신 - HTTP 요청과 같은 네트워크 호출에 사용됨. 이것은 플랫폼 독립적인 인터페이스이고 각 플랫폼 하부에서 실행됨
- UI 백엔드(Display Backend) - 콤보 박스와 창 같은 기본적인 장치를 그림. 플랫폼에서 명시하지 않은 일반적인 인터페이스로, OS 사용자 인터페이스 체계를 사용.
- 자바스크립트 해석기 - 자바스크립트 코드를 해석하고 실행.
- 자료 저장소 - 자료를 저장하는 계층. 쿠키나 로컬스토리지 같은 모든 종류의 자원을 하드 디스크에 저장.

# 38.2. HTTP(HyperText Transfer Protocol)

HTTP는 웹에서 브라우저와 서버가 통신하기 위한 프로토콜이다. HTTP/1.1에서 HTTP/2로 넘어오는 과정에서 다중 요청/응답이 가능해져 리소스의 동시 전송이 가능하므로 페이지 로드 속도가 빠르다.

## 38.2.1. HTTP/1.1

기본적으로 커넥션당 하나의 요청과 응답만 처리한다. 즉, 여러 개의 리소스 요청이 개별적으로 전송되고 응답 또한 개별적으로 전송된다. 이처럼 HTTP/1.1은 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례하여 응답 시간도 증가한다.

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

## 38.2.2. HTTP/2

HTTP/2는 다중 요청/응답이 가능하다. 리소스의 동시 전공이 가능하므로 HTTP/1.1에 비해 페이지 로드 속도가 빠르다.

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

## 38.2.3. HTTP/3

TCP대신 UDP기반의 QUIC 프로토콜을 사용한 방식

|  | TCP | UDP |
| --- | --- | --- |
| 연결 방식 | 연결 지향형 프로토콜 | 비 연결 지향형 프로토콜 |
| 전송 순서 | 보장 | 보장하지 않음 |
| 신뢰성 | 높음 | 낮음 |
| 전송속도(상대적) | 느림 | 빠름 |
| 혼잡제어 | 가능 | 불가능 |
| 헤더크기 | 20 BYTE | 8 BYTE |

# 38.3. HTML 파싱과 DOM 생성

HTML 문서는 서버로부터 바이트 형태로 전달 받으며, 이후 문자열로 변환된 순수한 텍스트이다.

브라우저에 시각적으로 렌더링 하기위해 HTML 문서를 토큰으로 분해한 후 각 토큰을 객체화하여 노드를 생성한다. 이 노드가 기본 요소가 되어 브라우저가 이해할 수 있는 자료구조(객체)인 DOM을 생성한다.

즉 DOM은 HTML문서를 파싱한 결과물이다.

# 38.4. CSS 파싱과 CSSOM 생성

HTML 파싱 중 CSS(link 태그, style 태그)를 만나면 CSS 역시 HTML 파싱과 같은 과정(바이트 → 문자열 → 토큰 → 노드)으로 파싱하여 CSSOM을 생성한다. CSSOM를 생성하여 CSS 파싱이 끝나면 HTML 파싱이 중단된 시점부터 다시 DOM 생성을 재개한다.

---

CSSOM은 CSS의 상속을 반영하여 생성된다. 다만 모든 프로퍼티가 상속 되는건 아니다.

- 상속 되는 프로퍼티
  visibility, opacity, font, color, line-height, text-align, white-space 등.
- 상속 되지 않는 프로퍼티
  width, height, margin, padding, border, box-sizing, display, background, vertical-align, text-decoration, position, top, right, bottom, left, z-index, overflow, float 등.

---

### Ref. 캐스캐이딩(Cascading)

요소는 하나 이상의 CSS 선언어 영향을 받을 수 있다. 이때 충돌을 피하기 위해 CSS 적용 우선순위가 필요한데 이를 캐스캐이딩(Cascading Order)이라 한다.

1. 중요도 -  CSS가 어디에 선언 되었는지에 따라 우선순위가 다르다.
    1. head 요소 내의  style 요소
    2. head 요소 내의  style 요소 내의 @import 문
    3. <link>로 연결된 CSS파일
    4. <link>로 연결된 CSS 파일 내의 @import 문
    5. 브라우저의 디폴트 스타일시트
2. 명시도 - 대상을 명확하게 특정할수록 명시도가 높아지고 우선순위가 높아진다.
    1. !important
    2. 인라인 스타일
    3. 아이디 선택자
    4. 클래스/어트리뷰트/가상 선택자
    5. 태그 선택자 > 전체 선택자
    6. 상위 요소에 의해 상속된 속성
3. 선언순서 - 나중에 선언된 스타일이 우선 적용된다.
    - 선언된 순서에 따라 우선 순위가 적용 되는데, 나중에 선언된 스타일이 우선 선언된다.

---

# 38.5. 렌더 트리 생성

렌더링 엔진이 서버로부터 응답된 HTML, CSS를 파싱한 결과물인 DOM, CSSOM을 결합하여 렌더링을 위한 트리 구조의 자료구조인 렌터 트리(render tree)를 만든다.

렌더 트리는 렌더링을 위한 자료구조로 브라우저 화면에 렌더링되지 않는 노드(meta 태그, script 태그)와 CSS에 의해 비표시(ex. display: none)되는 노드들을 포함하지 않는다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fab626bc-24a2-4867-9f46-b309fc30b022/Untitled.png)

## 38.5.1. 리렌더링

위의 브라우저 렌더링 과정(38.1 ~ 38.5)은 박복해서 실행돼 리렌더링 될수 있는데, 레이아웃 계산과 페인팅을 다시 실행하는 리렌더링은 비용이 많이 드는, 성능에 악영향을 주는 작업으로 가급적 아래의 상황을 빈번하게 발생하지 않도록 주의할 필요가 있다.

- 자바스크립트에 의한 노드 추가 또는 삭제
- 브라우저 창의 리사이징에 의한 뷰포트 크기 변경
- HTML 요소의 레이아웃에 변경을 발생시키는 스타일 변경(width/height, margin/padding, border, display, position, top/right/bottom/left)

# 38.6. 자바스크립트 파싱과 실행

HTML 문서를 파싱한 결과물인 DOM은 HTML 문서의 구조와 정보뿐 아니라 프로그래밍 인터페이스로 DOM API를 제공한다. 자바스크립트 코드에서 DOM API를 이용하면 DOM을 동적으로 조작할 수 있다.

브라우저 렌더링 엔진은 CSS 파싱 과정과 마찬가지로 자바스크립트 코드(script 태그)를 만나면 블록킹 되고 끝나면 다시 재개한다. 다만 CSS와 다른점은 자바스크립트 코드는 자바스크립트 엔진이 제어권을 넘겨 받아 파싱한다.

자바스크립트 엔진은 자바스크립트 코드를 파싱하여 CPU가 이해할 수 있는 Low Level Language로 변환하고, 실행하는 역할을 한다. 자바스크립트 엔진은 구글 크롬, Node.js의 V8, 파이어폭스의 SpiderMonkey 등 다양한 종류가 있으며 모두 ECMAscript 사양을 준수한다.

렌더링 엔진이 HTML, CSS를 파싱하여 DOM, CSSOM을 생성하듯, 자바스크립트 엔진 또한 자바스크립트 코드를 해석하여 AST(Abstract Syntax Tree)를 생성한다. 그리고 AST를 기반으로 인터프리터가 실행할 수 있는 중간 코인 바이트코드를 생성하여 실행한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b2454bfa-4711-4e42-ac4e-f66f85c0d30c/Untitled.png)

<aside>
💡 토크나이징
자바스크립트 코드를 분석하여 '의미를 갖는 최소 단위'인 토큰으로 분해하고 이 과정을 토크나이징이라 부른다. 이 과장을 렉싱이라 부르기도 하지만 토크나이징과 미묘한 차이가 있다.

</aside>

<aside>
💡 파싱
토큰들의 집합을 구문 분석하여 문법적으로 의미를 갖는 AST(추상적 구문 트리)를 생성하고 이 과정을 파싱이라 한다.

</aside>

<aside>
💡 인터프리터
파싱된 결과물인 AST를 byte code로 변환한다.

</aside>

<aside>
💡 바이트코드 생성과 실행
파싱의 결과물로 생성된 AST는 인터프리터가 실행할 수 있는 중간 코드인 바이트코드로 변환되고 인터프리터에 의해 실행된다. V8 엔진의 경우 자주 사용되는 코드는 터보팬이라 불리는 컴파일러에 의해 최적화된 머신 코드로 컴파일되어 성능을 최적화하고 코드의 사용 빈도가 적어지면 다시 디옵티마이징하기도 한다.

</aside>

# 38.7. 리플로우(reflow)와 리페인트(repaint)

DOM이나 CSSOM이 변경되면 다시 렌더 트리로 결합되고, 변경된 렌더트리를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우저 화면에 다시 렌더링하는데, 이를 리플로우, 리페인트라 한다.

리플로우는 레이아웃에 영향을 주는 변경(노드 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등)이 발생한 경우에 한하여 실행되고, 리페인트는 재결합된 렌더 트리를 기반으로 다시 페인트를 하는 것을 말한다.

# 38.8. 자바스크립트 파싱에 의한 HTML 파싱 중단

렌더링 엔진과 자바스크립트 엔진은 병렬적으로 파싱을 실행하지 않고 직렬적으로 파싱을 수행한다. 즉 HTML 파싱 도중 자바스크립트 코드를 만나면 블로킹되어 자바스크립트 엔진에게 제어권을 넘긴다.

브라우저는 동기적(위에서 아래로)으로 파싱하므로 HTML 파싱이 script 태그의 위치에 따라 지연될 수 있다.

HTML 파싱이 이뤄지기 전의 DOM을 자바스크립트가 DOM API를 통해 조작하게 된다면 정상적으로 동작하지 않는다. 이런 문제를 회피하기 위해서 body 요소의 가장 아래에 자바스크립트를 위치시키는 편이 좋다.

# 38.9. script 태그의 async/defer 어트리뷰트

외부 자바스크립트 파일을 script 태그 src 어트리뷰트를 통해 로드하는 경우 async, defer 어트리뷰트를 통해서 비동기적으로 로드할 수 있다. 이를 통해 DOM 렌더링의 블로킹을 방지할 수 있다.

두 속성 모두 비동기를 통해 블록킹하지 않고 자바스크립트 파일을 로드할 수 있지만 실행 시점에는 차이가 있다. async 어트리뷰트 같은 경우에는 JS 파일의 로드가 완료된 직후 JS가 파싱 및 실행되므로 로드 완료 시점에 따라 파싱과 실행 순서가 바뀌어 순서가 보장되지 않는다. defer 어트리뷰트는 JS 파일을 로드해두고 DOM 생성 이후오 JS 파일을 파싱 및 실행한다.