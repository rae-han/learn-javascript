console.log('start');

const logFunc = (text) => console.log(text)

setTimeout(() => logFunc('callback'), 0);

const _DELAY = 1000000001;
for(let i = 0; i<_DELAY; i++) { if(i === (_DELAY-1)) console.log('delay') };

logFunc('global')

console.log('end');