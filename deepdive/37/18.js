// 교집합

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([1, 2, 5, 6]);
const setC = new Set([1, 2, 3, 4, 5, 6]);

Set.prototype.intersection = function(set) { // 왜 화살표 함수는 안될까?
// Set.prototype.intersection = (set) => { // 왜 화살표 함수는 안될까?
  const result = new Set();

  for (const value of this) {
    if(set.has(value)) result.add(value);
  }

  return result;
}

console.log(setA.intersection(setB));

Set.prototype.intersectionFunc = function(set) {
  return new Set([...this].filter(item => set.has(item)));
};

console.log(setA.intersectionFunc(setB));


// 합집합

Set.prototype.union1 = function(set) {
  const result = new Set(this);

  for(const item of set) {
    result.add(item);
  }

  return result;
};

console.log(setA.union1(setB));
console.log(setB.union1(setA));

Set.prototype.union2 = function(set) {
  return new Set([...this, ...set]);
}

console.log(setA.union2(setB));
console.log(setB.union2(setA));

// 차집합

Set.prototype.difference1 = function(set) {
  const result = new Set(this);

  for (const item of set) {
    result.delete(item);
  }

  return result;
}

console.log(setA.difference1(setB));
console.log(setA.difference1(setC));

Set.prototype.difference2 = function(set) {
  return new Set([...this].filter(item => !set.has(item)));
}

console.log(setA.difference1(setB));
console.log(setA.difference1(setC));

// 부분 집합, 상위 집합

Set.prototype.isSuperset1 = function(subset) {
  for(const item of subset) {
    if(!this.has(item)) return false;
  }

  return true;
}

console.log(setA.isSuperset1(setB)); // false
console.log(setC.isSuperset1(setB)); // true

Set.prototype.isSuperset2 = function(subset) {
  let subsetArr = [...subset];
  let supersetArr = [...this];

  return subsetArr.every(item => supersetArr.includes(item));
}

console.log(setA.isSuperset2(setB)); // false
console.log(setC.isSuperset2(setB)); // true







