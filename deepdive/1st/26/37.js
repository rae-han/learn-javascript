// window.x = 1;
this.x = 1; // global.x = 1 -> 동작x

const normal = function () { return this.x; };
const arrow = () => this.x;

console.log(normal.call({ x: 10 })); // 10
console.log(arrow.call({ x: 10 }));  // 1