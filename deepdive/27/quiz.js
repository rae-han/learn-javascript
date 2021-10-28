const func = (value = '') => { 
  value = '' + value

  return value.split('').reverse().reduce((acc, digit, idx) => {
    if (idx > 0 && idx % 3 === 0 && digit !== '-') acc.push(',')
    return [...acc, digit]
  }, []).reverse().join('')
}

console.log(func(1234567890));
console.log(func(-1234567890));
console.log(func(-123456789));

const cities = {
  London: 'UK',
  Manchester: 'UK',
  Liverpool: 'UK',
  Paris: 'France',
  Berlin: 'Germany',
  Munchen: 'Germany',
};

let countries = Object.entries(cities).reduce((acc, [city, country]) => ({ ...acc, [country]: [...(acc[country] || []), city] }), {});

console.log(countries);