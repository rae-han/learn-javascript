let foo = (...rest = []) => { // SyntaxError: Rest parameter may not have a default initializer
  console.log(rest);
}