const counter = (function() {
  let _counter = 0;

  function changeBy(val) {
    _counter += val;
  }

  return {
    value: () => {
      return _counter;
    },
    increment: () => {
      changeBy(1);
    },
    decrement: () => {
      changeBy(-1);
    }
  }
})();

console.log(counter.value()); // 0
counter.increment();
counter.increment();
console.log(counter.value()); // 0
counter.decrement();
console.log(counter.value()); // 0
