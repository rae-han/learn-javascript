const d = (arr) => {
  const set = new Set();

  arr.forEach(num => {
    set.add(num%42);
  });

  return set.size;
}

console.log(d([1, 2, 3, 4, 5, 42, 42, 42, 42, 42]));