const foo = (...rest) => {
  console.log(rest); // [ 1, 2, 3, 4, 5 ]
};

foo(1, 2, 3, 4, 5);