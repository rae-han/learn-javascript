// Object.prototype.toString
global.toString(); // -> "[object Window]"

console.log(global.__proto__.__proto__ === Object.prototype); // true

// // Object.prototype.toString
// window.toString(); // -> "[object Window]"
//
// window.__proto__.__proto__.__proto__.__proto__ === Object.prototype; // -> true