// // ex1
// const x = 1;

// function outerFunc1() {
//   const x = 10;

//   function innerFunc1() { 
//     console.log(x); 
//   }

//   innerFunc1();
// }

// outerFunc1(); // 10

// // ex2
// const y = 2;

// function outerFunc2 () {
//   const y = 20;
//   innerFunc2();
// }

// function innerFunc2() {
//   console.log(y); // 1
// }

// outerFunc2();
// innerFunc2();

// // ex3
// const z = 3;

// const innerFunc3 = () => {
//   console.log(z); // 1
// }

// const outerFunc3 = () => {
//   const z = 30;
//   innerFunc3();
// }

// outerFunc3(); 


// const x = 1;

// function outerFunc1() {
//   const x = 10;

//   function innerFunc1() { 
//     console.log(x);
//     console.dir(innerFunc1);
//     console.log(this)
//   }

//   innerFunc1();
// }

// outerFunc1(); // 10



function outerFunc() {
	let x = 10;
  let innerFunc = function () {
    console.log(x)
  }

  return innerFunc;
}

let inner = outerFunc();
inner(); // 10