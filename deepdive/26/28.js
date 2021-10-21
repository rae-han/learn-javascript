// class Prefixer {
//   constructor(prefix) {
//     this.prefix = prefix;
//   }

//   add(arr) {
//     return arr.map(function (item) {
//       return this.prefix + item; // Cannot read property 'prefix' of undefined
//     });
//   }
// }

// const prefixer = new Prefixer('-webkit-');
// console.log(prefixer.add(['transition', 'user-select']));

global.prefix = 'global-global-';
// var prefix = 'global-var-'
// let prefix = 'global-let-'

function Prefixer (prefix) {
  this.prefix = prefix;

  this.add = function (arr) {
    return arr.map(function (item) {
      console.log(this)
      return this.prefix + item; // Cannot read property 'prefix' of undefined
    });
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer)
console.log(prefixer.add(['transition', 'user-select']));


























































































































































