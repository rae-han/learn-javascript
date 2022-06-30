const set = new Set().add(1);

set.add(1).add(1).add(2);
console.log(set); // Set(2) { 1, 2 }

set.add(NaN).add(NaN).add(-0).add(+0);
console.log(set); // Set(4) { 1, 2, NaN, 0 }

set
  .add('a')
  .add(true)
  .add(undefined)
  .add(null)
  .add({})
  .add([])
  .add(()=>{})
console.log(set); // Set(11) { 1, 2, NaN, 0, 'a', true, undefined, null, {}, [], [Function (anonymous)] }
