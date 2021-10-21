const arrow = [
  (x, y) => { console.log(x, y) },
  x => console.log(x),
  () => console.log(2),
]

arrow.map(func => func(1, 2)); // 1 2 / 1 / 2
// ????