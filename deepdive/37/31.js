const map = new Map();

map.set('k1', 'v1'); 
console.log(map) // Map(1) { 'k1' => 'v1' }

map.set('k2', 'v2').set('k1', 'v3');
console.log(map) // Map(2) { 'k1' => 'v3', 'k2' => 'v2' }

map.set(NaN, 'Not a Num');
console.log(map); // Map(3) { ..., NaN => 'Not a Num' }

map.set({ key: 'key' }, 'v4');
console.log(map); // { ..., { key: 'key' } => 'v4' }