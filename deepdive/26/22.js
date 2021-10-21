const es5 = [1, 2, 3].map(function (v) {
  return v*2;
});

const es6 = [1, 2, 3].map(v => v*2);

console.log(es5, es6)