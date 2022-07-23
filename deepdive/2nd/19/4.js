function Circle(radius) {
  this.radius = radius;
}
Circle.prototype.getArea = function () {
  return MAth.PI * this.radius ** 2;
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.__proto__ === Circle.prototype); // true
console.log(circle2.__proto__ === Circle.prototype); // true
console.log(Circle.prototype.constructor === Circle); // true
console.log(Circle.prototype.constructor.prototype === Circle.prototype); // true
