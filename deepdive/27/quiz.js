const func1 = (value = '') => { 
  value = '' + value

  return value.split('').reverse().reduce((acc, digit, idx) => {
    if (idx > 0 && idx % 3 === 0 && digit !== '-') acc.push(',')
    return [...acc, digit]
  }, []).reverse().join('')
}

const func2 = (obj = '') => Object.entries(obj).reduce((acc, [row, column]) => ({ ...acc, [column]: [...(acc[column] || []), row] }), {});

// // # Comma Number
console.log(func1(1234567890)); // * 1,234,567,890
console.log(func1(-1234567890)); // * -1,234,567,890
console.log(func1(-123456789)); // * -123,456,789
console.log(func1(123));

// // # Flip obejct
const cities = {
  London: 'UK',
  Manchester: 'UK',
  Liverpool: 'UK',
  Seoul: 'Korean',
  Ulsan: 'Korean',
  LA: 'USA',
};

console.log(func2(cities));
/*
{
  UK: [ 'London', 'Manchester', 'Liverpool' ],
  Korean: [ 'Seoul', 'Ulsan' ],
  USA: [ 'LA' ]
}
*/
