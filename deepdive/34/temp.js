function makeIterator(array){
  var nextIndex = 0;

  return {
    next: function(){
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {done: true};
    }
  };
}

var it = makeIterator(['yo', 'ya']);

console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done);  // true

for(const i of it) { console.log(i) } // it[Symbol.iterator] is not a function
