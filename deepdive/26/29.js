class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    const self = this;

    return arr.map(function (item) {
      return self.prefix + item; // Cannot read property 'prefix' of undefined
    });
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));