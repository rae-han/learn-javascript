const person = (function() {
  let _value = {
    name: '이름',
    age: 30
  };

  function changeBy(edit) {
    _value = { ..._value, ...edit }
  }

  return {
    value: () => {
      return _value;
    },
    setName: (name) => {
      // 2 ?
    },
    setAge: (age) => {
      // 2 ?
    }
  }
})();

console.log(person.value()) // 1 ?
person.setName({ name: '새 이름' });
console.log(person.value()) // 3 ?
console.log(person) // 4 ?