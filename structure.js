const arr = [[1, 2], [3, 4]];

const obj = {
  key1: {
    key2: {
      key3: 'this is key'
    }
  }
};

const [[one, two], [three, four]] = arr;
const { key1: { key2: { key3:key } } } = obj;

console.log(one, two, three, four);
console.log(key);