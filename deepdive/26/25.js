// 'use strict'; - (A)
function normal(a, a) { return a + a; }
console.log(normal(1, 2)); // 4 
// (A) - SyntaxError: Duplicate parameter name not allowed in this context

const arrow = (a, a) => a + a; // SyntaxError: Duplicate parameter name not allowed in this context