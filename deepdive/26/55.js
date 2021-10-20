function sum(...args) {
  for (const [key, value] of Object.entries(arguments)) {
    console.log(`${key}: ${value}`) // 0: 1, 1: 2, 2: 3, 3: 4, 4: 5
  }

  let array = Array.prototype.slice.call(arguments);

  return {
    argumentsSum: array.reduce((pre, cur) => {
      return pre + cur;
    }, 0),
    restSum: args.reduce((pre, cur) => pre + cur, 0)
  }
}

console.log(sum(1, 2, 3, 4, 5)); // { argumentsSum: 15, restSum: 15 }