console.dir(new Date());
console.dir(Date());

console.log(Date.now());
console.log(Date(Date.now()));

console.log(3)
// console.log(new Date().setTime(86400000).getTime());
console.log(Date.UTC(1970, 0, 2));

const today = new Date();

console.log(today.getTimezoneOffset() / 60);

const testObject = {
  a: 1,
  b: 2,
}

console.log(Object.entries(testObject).forEach(([key, value]) => console.log(key, value)))