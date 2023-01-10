class Foo {
  constructor() {

  }

  a() {
    console.log('a', this)
  }

  b() {
    (function() {
      console.log('b', this)
    })()
  }

  c() {
    (() => {
      console.log('c', this)
    })()
  }
}

const foo = new Foo()
foo.a();
foo.b();
foo.c();