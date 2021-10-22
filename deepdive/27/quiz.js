const func = (value = '') => { 
  value = '' + value

  return value.split('').reverse().reduce((acc, digit, idx) => {
    if (idx > 0 && idx % 3 === 0) acc.push(',')
    return [...acc, digit]
  }, []).reverse().join('')
}

console.log(func(1234567890))
console.log(func(-1234567890))
console.log(func(-123456789))