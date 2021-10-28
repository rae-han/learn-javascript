const func1 = (value = '') => { 
  value = '' + value

  return value.split('').reverse().reduce((acc, digit, idx) => {
    if (idx > 0 && idx % 3 === 0 && digit !== '-') acc.push(',')
    return [...acc, digit]
  }, []).reverse().join('')
}

const cities = {
  London: 'UK',
  Manchester: 'UK',
  Liverpool: 'UK',
  Paris: 'France',
  Berlin: 'Germany',
  Munchen: 'Germany',
};

const func2 = (obj = '') => Object.entries(obj).reduce((acc, [row, column]) => ({ ...acc, [column]: [...(acc[column] || []), row] }), {});

// # Comma Number
console.log(func1(1234567890)); // * 1,234,567,890
console.log(func1(-1234567890)); // * -1,234,567,890
console.log(func1(-123456789)); // * -123,456,789

// # Flip obejct
console.log(func2(cities));
/*
{
  UK: [ 'London', 'Manchester', 'Liverpool' ],
  France: [ 'Paris' ],
  Germany: [ 'Berlin', 'Munchen' ]
}
*/
