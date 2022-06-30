const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

for (const num of arr1) {
  console.log(num)
}

arr1[Symbol.iterator] = null;

for (const num of arr2) {
  console.log(num)
}