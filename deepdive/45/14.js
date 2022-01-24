// const promise1 = new Promise((res, rej) => res('success'))

// promise1
//   .then(v => console.log(v))
//   .catch(e => console.log(e))

// const promise2 = new Promise((res, rej) => rej('failure'))

// promise2
//   .then(v => console.log(v), e => console.log(1, e))
//   .catch(e => console.log(2, e))

const promise = new Promise((resolve, reject) => {
  resolve(1);
  reject(0);
});

console.log('start');
promise
  .then(result => {
    console.log(result)
    return result +1;
  })
  .then(result => {
    console.log(result)
    return result +1;
  })
  .then(result => {
    console.log(result)
    return result +1;
  })
  .then(result => {
    console.log(result)
    return result +1;
  })
  .catch(e => console.log(e))
  .finally(v => console.log('finish'))