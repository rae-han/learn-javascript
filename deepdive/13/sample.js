var x  = 'glolbal';

function foo() {
  var x = 'local';

  console.log(x);
};

foo();

console.log(x);

var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo();
bar();