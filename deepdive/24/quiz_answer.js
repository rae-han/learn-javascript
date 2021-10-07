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
      // 2
      changeBy(name);
    },
    setAge: (age) => {
      // 2
      changeBy(age);
    }
  }
})();

console.log(person.value()) // 1 { name: '이름', age: 30 }
person.setName({ name: '새 이름' });
console.log(person.value()) // 3 { name: '새 이름', age: 32 }
console.log(person) 
// 4
// {
//   value: [Function: value],
//   setName: [Function: setName],
//   setAge: [Function: setAge]
// }
