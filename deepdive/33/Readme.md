## 실무 활용 예시

1. api 상태 이름 지정시
    
    api 상태를 pending, success, running 으로 관리한다고 했을 때 문자열 값을 사용하지 않고 전역에 symbol 값 등록해서 사용
    
    ```jsx
    // 전역에서 사용할 파일
    const statusList = ['PENDING', 'SUCCESS', 'RUNNING'];
    
    const apiStatus = statusList.reduce((acc, key) => {
      acc[[key]] = Symbol(key);
      return acc;
    }, {});
    
    module.exports = {
      apiStatus
    }
    ```
    
    ```jsx
    // client side
    // import { apiStatus: { PENDING, SUCCESS, RUNNING } } from '[전역에서 사용하고 있는 파일 명]';
    // server side
    const { apiStatus: { PENDING, SUCCESS, RUNNING } } = require('[전역에서 사용하고 있는 파일 명]');
    
    console.log(PENDING, SUCCESS, RUNNING); // Symbol(PENDING) Symbol(SUCCESS) Symbol(RUNNING)
    ```
    
    보통은 그냥 문자열을 쓴다.

    ```jsx
    export const PENDING = 'PENDING';
    export const SUCCESS = 'SUCCESS';
    export const RUNNING = 'RUNNING';
    ```

2. 모달, 토스트메세지, 노티피케이션 등의 기능 구현
    
    React, Vue, Angular 같은 경우 컴포넌트 하나를 만들고 해당 컴포넌트를 재사용 해서 계속 뷰를 구성한다. 토스트 메세지를 예로 들면 중복으로 떠야 할때 Symbol 값을 이용하여 각기 다른 식별자를 부여할 수 있고 해당 식별자를 통해 각기 다른 기능을 하게 만들다던가 업데이트(수정, 삭제) 할수 있다.
    
    보통은 이런 메세지 관리는 잘못되도 앱에 큰 영향은 없어서 가볍게 현재시간과 랜덤한 값으로 관리하던가 uuid 같은 라이브러리(자바스크립트에서는 [uuid(npm)](https://www.npmjs.com/package/uuid))를 사용하여 식별자를 부여한 후 관리한다.
    

3. 서드파티에서 가져온 데이터에 나만 알수 있는 식별자를 만들때.
    
    예를 들면 유저 목록 데이터를 받아 왔을때 해당 데이터의 유일한 값을 사용해도 되지만 나만의 값을 사용해야 할 때가 있다. 그와 동시에 이 데이터를 건들이지 말아야할 상황일 때 Symbol을 사용하면 된다.
    
    ```jsx
    const name = Symbol('name');
    const user = {
      name: 'raehan',
      [name]: 'jeong', // 리터럴 일땐 대괄호로 심볼 값 추가
      id: 1,
    }
    
    const id = Symbol('id');
    user[id] = 2;
    console.log(user); // { name: 'raehan', id: 1, [Symbol(name)]: 'jeong', [Symbol(id)]: 2 }
    ```