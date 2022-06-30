let func = ({ a: x = 1, b: y = 2 }) => {
  console.log(x, y)
}

func({
  a: undefined,
  b: undefined,
})