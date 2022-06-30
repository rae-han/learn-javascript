[1, 2].map(function (num) {
  console.log(this.constructor); // [Function: Object]
  console.log(this.constructor.hasOwnProperty('prototype')); // true
  return num*2;
});