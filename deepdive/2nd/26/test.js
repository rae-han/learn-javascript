function foo () {
  function bar() {
    const b = 1;
    console.log(a + b);
  }

  bar();
  const a = 1;
}

foo();