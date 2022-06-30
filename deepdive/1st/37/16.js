const set1 = new Set([1, 2, 3]);
const set2 = new Set([4, 5, 6]);

set1.forEach((v1, v2, set) => console.log(v1, v2, set, this), set2); // ??
set1.forEach((v1, v2, set) => console.log(v1, v2, set, this)); // ??
/* 
1 1 Set(3) { 1, 2, 3 } {}
2 2 Set(3) { 1, 2, 3 } {}
3 3 Set(3) { 1, 2, 3 } {}
*/
const cbArrowFunc = (v1, v2, set) => console.log(v1, v2, set, this);
const cbNormalFunc = function (v1, v2, set) { console.log(v1, v2, set, this) };
set1.forEach(cbArrowFunc, set2); // 위와 같음
set1.forEach(cbNormalFunc, set2);
/*
1 1 Set(3) { 1, 2, 3 } Set(3) { 4, 5, 6 }
2 2 Set(3) { 1, 2, 3 } Set(3) { 4, 5, 6 }
3 3 Set(3) { 1, 2, 3 } Set(3) { 4, 5, 6 }
*/
set1.forEach(cbNormalFunc);
/* Server
1 1 Set(3) { 1, 2, 3 } <ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
} ...
*/
/* Client
1 1 Set(3) {1, 2, 3} Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …}
...
*/
set1.forEach(function (v1, v2, set) { console.log(v1, v2, set, this) }, set2);




