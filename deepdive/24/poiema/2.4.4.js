const arr = new Array(5).fill();

arr.forEach((v, i, array) => array[i] = () => i);

arr.forEach(f => console.log(f()));

arr.map(a => a);