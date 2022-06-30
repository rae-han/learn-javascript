const Foo = () => {};

new Foo(); // Foo is not a constructor

console.log(Foo.hasOwnProperty('prototype')); // false