function normalFunc () {
  const a = 1;

  function b() {
    const c = 1;
    console.log('b in normalFunc');
    console.log(this) // global
  }

  const d = () => {
    console.log('d in normalFunc')
    console.log(this); // global (상위 객체의 this)
  }

  console.log('normalFunc');
  console.log(this); // global

  b();
  d();
}

normalFunc();

const arrowFunc = () => {
  const a = 1;

  function b() {
    const c = 1;
    console.log('b in arrowFunc');
    console.log(this) // global
  }

  const d = () => {
    console.log('d in arrowFunc')
    console.log(this); // {}
  }

  console.log('arrowFunc');
  console.log(this); // {}
  console.log(this)

  b();
  d();
}

arrowFunc();

const object = {
  value: 1,
  normal: function() {
    console.log('outer normal');
    console.log(this) // object

    function innerNormal() {
      console.log('inner normal');
      console.log(this) // global
    }

    const innerArrow = () => {
      console.log('inner arrow');
      console.log(this); // object
    }

    innerNormal();
    innerArrow();
  },
  arrow: () => {
    console.log('arrow');
    console.log(this) // {}
  },
  method() {
    console.log('method');
    console.log(this) // object
  },
}

object.normal();
object.arrow();
object.method();

const constructorFunc = function (color = 'black') {
  this.color = color;
  this.value = true;

  this.sayHi = function() {
    console.log('sayHi');
    console.log(this); // instance
  }

  this.sayBye = () => {
    console.log('sayBye');
    console.log(this) // instance
  }
}

const instance = new constructorFunc();
instance.sayHi();
instance.sayBye();