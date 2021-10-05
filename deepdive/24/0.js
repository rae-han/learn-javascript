const x = 1;

function outerFunc1() {
  const x = 10;

  function innerFunc1() {
    console.log(x); // 10
  }

  innerFunc1();
}

outerFunc1();

const y = 1;

function outerFunc2 () {
  const y = 10;
  innerFunc2();
}

function innerFunc2() {
  console.log(y)
}

outerFunc2();

const z = 1;

const innerFunc3 = () => {
  console.log(z)
}

const outerFunc3 = () => {
  const z = 10;
  innerFunc3();
}

outerFunc3();