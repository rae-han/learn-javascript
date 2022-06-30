const arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(arr);

for(let i = 0; i<arr.length; i++) {
  delete arr[i];
};

console.log(arr);