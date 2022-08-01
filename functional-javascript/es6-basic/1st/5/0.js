const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const result  = reduce((acc, cur) => {
  return acc + cur
}, 0, [1, 2, 3, 4, 5])

console.log(result)