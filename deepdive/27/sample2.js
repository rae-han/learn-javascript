let alphabet = ['a', 'b', 'c', 'd'];

delete alphabet[1];

console.log(alphabet);
console.log(alphabet.length);

alphabet.forEach(v => console.log(v)); // a c d
console.log(0 in alphabet); // true
console.log(1 in alphabet); // false
console.log(alphabet[1]);
alphabet[0] = undefined;
alphabet.forEach(v => console.log(v)); // undefined c d
console.log(0 in alphabet); // true





