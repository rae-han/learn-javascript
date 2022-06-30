const testcase = [1, 2, 2, 3, 3, 3, 4, 5, 6, 6, 1];

const uniqFunc = array => array.filter((v, i, self) => self.indexOf(v) === i);

console.log(uniqFunc(testcase));

const uniqSet = new Set(testcase);

console.log(uniqSet);
console.log(uniqSet.size);

console.log(uniqSet.has(1));
console.log(uniqSet.has(6));
console.log(uniqSet.has(8));

console.log(uniqSet.delete(2));
console.log(uniqSet);
console.log(uniqSet.delete(4));
console.log(uniqSet);
console.log(uniqSet.delete(8));

uniqSet.forEach((v, i, arr) => console.log(v, i, arr))

