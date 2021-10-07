class Counter {
  #count = 0;

  getCount() {
    console.log(this.#count)
    return this.#count;
  }
}

let counter = new Counter();

console.log(counter)
counter.getCount();