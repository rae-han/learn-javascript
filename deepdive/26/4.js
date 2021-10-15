[1, 2, 3].map(function (num) {
  // console.log(this)
  console.log(this.prototype);
  console.log(this.__proto__);
  return num*2;
});

[1, 2, 3].map(num => {
  // console.log(this)
  console.log(this.prototype);
  console.log(this.__proto__);
  return num*2;
});