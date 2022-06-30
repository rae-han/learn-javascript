const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};

for (let i = 0; i < arrayLike.length; i++) {
  console.log(arrayLike[i]); // 1 2 3
}

for (let item of arrayLike) { // TypeError: arrayLike[Symbol.iterator] is not a function
  console.log(item);
}