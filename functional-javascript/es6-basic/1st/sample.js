const increase = function (num) { // 무명의 리터럴로 생성 후 변수에 저장.
  return ++num;
}

const makeIncreaser = (func) => {
  let num = 0;

  return () => {
    num = func(num);
    return num;
  }
}

const increaser = makeIncreaser(increase);

increaser(); // 1
increaser(); // 2
increaser(); // 3