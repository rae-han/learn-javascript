const counter = (function () {
  let counter = 0;

  return function (predicate) {
    counter = predicate(counter);

    return counter
  };
}());

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

console.log(counter(increase)); // 1
console.log(counter(increase)); // 2
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0