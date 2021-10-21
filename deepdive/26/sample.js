let callback;
console.log(callback); // undefined

callback = callback || function() {};
console.log(callback); // [Function (anonymous)]

// callback = callback || () => {}; // SyntaxError: invalid arrow-function arguments

callback = callback || (() => {});
console.log(callback); // [Function (anonymous)]
