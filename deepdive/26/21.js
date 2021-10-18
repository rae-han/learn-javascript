const person = (name => ({
  sayHi() { return `Hi? My name is ${name}.`}
}))('Raehan');

console.log(person.sayHi());