const numberList = [1.4, 1.6, -1.4, -1.6, 1, null];

numberList.forEach(item => {
  console.log(`item => Math.round: ${Math.round(item)}, Number.prototype.toFixed: ${item.toFixed(0)}`);
});