function foo() {
  console.log(arguments);
  // server: [Arguments] { '0': 1, '1': 2 }
  // client: Arguments(2) [1, 2, callee: ƒ, length: 2, Symbol(Symbol.iterator): ƒ]

  for (const [key, value] of Object.entries(arguments)) {
    console.log(`${key}: ${value}`) // 0: 1, 1: 2
  }
}

foo(1, 2);
