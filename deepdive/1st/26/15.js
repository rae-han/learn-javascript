const log = (value) => console.log(value);
const squared = x => x**2;

log(squared(2));

// const example = () => const x = 1;
const example = () => { const x = 1 };
example();