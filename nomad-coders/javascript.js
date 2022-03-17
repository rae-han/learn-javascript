const numA = 1234567890;
const numB = 1_234_567_890;
const numC = 12_3456_7890;

console.log(numA, numB);
console.log(numA === numB);

let a = 1;
if(a) {
  a = 2;
}
console.log(a)

let b = 1;
b &&= 2;
console.log(b)

let c = false;
if(!c) {
  c = true;
}
console.log(c);

let d = false;
d ||= true;
console.log(d);

let e = undefined;
if(e === undefined) {
  e = "hello";
}
console.log(e);

let f = undefined;
f ??= "hello";
console.log(f);

console.log()