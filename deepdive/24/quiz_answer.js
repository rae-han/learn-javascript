const person = (function() {
  let _value = {
    name: '이름',
    age: 30
  };

  function changeBy(edit) {
    console.log(edit)
    _value = { ..._value, ...edit }
  }

  return {
    value: () => {
      return _value;
    },
    setName: (name) => {
      changeBy(name);
    },
    setAge: (age) => {
      changeBy(age);
    }
  }
})();

console.log(person.value())
person.setName({ name: '새 이름' });
person.setAge({ age: 32 });
console.log(person.value())