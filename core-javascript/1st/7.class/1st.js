const Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function () {
  return this.width * this.height;
}

Rectangle.isRectangle = function (instance) {
  return instance instanceof Rectangle && instance.width > 0 && instance.height > 0
}

let rect1 = new Rectangle(3, 4);

console.log(rect1.getArea())
console.log(Rectangle.isRectangle(rect1))
console.log(rect1.__proto__ === Rectangle.prototype)
