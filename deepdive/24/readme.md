# 클로저

## 클로저의 정의

> 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.   
A closure is the combination of a function and the lexical environment within which that function was declared.
> 
- example code
    
    ```jsx
    // ex1
    const x = 1;
    
    function outerFunc1() {
      const x = 10;
    
      function innerFunc1() {
        console.log(x); // 10
      }
    
      innerFunc1();
    }
    
    outerFunc1();
    
    // ex2
    const y = 1;
    
    function outerFunc2 () {
      const y = 10;
      innerFunc2();
    }
    
    function innerFunc2() {
      console.log(y); // 1
    }
    
    outerFunc2();
    
    // ex3
    const z = 1;
    
    const innerFunc3 = () => {
      console.log(z); // 1
    }
    
    const outerFunc3 = () => {
      const z = 10;
      innerFunc3();
    
    outerFunc3(); 
    ```