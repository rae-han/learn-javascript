var arr = [];

for (var i = 0; i < 5; i++){
  arr[i] = (function (id) {
    return function () {
      return id;
    };
  }(i));
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}