const Decimal = require('decimal.js');

let num = new Decimal(0.01234567);
console.log((''+num).split('').filter(v => (v!=='0' && v!=='.')).length); // 7

