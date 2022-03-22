const testFunc = x => y => {
  console.log(x, y);
};

console.log(testFunc(1));
console.log(testFunc(1)(2));