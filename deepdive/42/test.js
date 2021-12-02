console.log('start');

const logFunc = (text) => console.log(text)

setTimeout(() => logFunc('callback'), 0);

const delay = 1000000001;
for(let i = 0; i<delay; i++) { if(i === (delay-1)) console.log(i) };

logFunc('global')

console.log('end');