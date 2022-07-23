function normal() {
  console.log(this);
  this.log = function () { console.log(this) }
}

const object = {
  method1: function() {
    console.log(this)
  },
  method2() {
    console.log(this)
  }
};

const instance = new normal();

normal(); // window or global
object.method1(); // { method1: [Function: method1], method2: [Function: method2] }
object.method2(); // { method1: [Function: method1], method2: [Function: method2] }
instance.log(); // normal { log: [Function (anonymous)] }

