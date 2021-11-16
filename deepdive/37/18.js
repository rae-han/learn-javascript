const setA = new Set([1, 2, 3, 4]);
const setB = new Set([1, 2, 5, 6]);

Set.prototype.intersection = function(set) { // 왜 화살표 함수는 안될까?
// Set.prototype.intersection = (set) => { // 왜 화살표 함수는 안될까?
  const result = new Set([]);

  for (const value of this) {
    if(set.has(value)) result.add(value);
  }

  return result;
}

console.log(setA.intersection(setB));

// Set.prototype.intersectionFunc = 

