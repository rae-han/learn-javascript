const foo = (param, ...rest) => {
  console.log(param, rest); // 1 [ 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);

const bar = (param1, param2, ...rest) => {
  console.log(param1, param2, rest) // 1 2 [ 3, 4, 5 ]
}

bar(1, 2, 3, 4, 5);