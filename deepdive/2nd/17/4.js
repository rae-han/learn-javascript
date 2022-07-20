function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

Circle.prototype.calcDiameter = function () {
  return 2 * this.radius;
}

const circle1 = new Circle(5);
const circle2 = new Circle(5);

console.log(circle1.getDiameter(), circle2.getDiameter()); // 10 10
console.log(circle1.getDiameter === circle2.getDiameter); // false
console.log(circle1.calcDiameter(), circle2.calcDiameter()); // 10
console.log(circle1.calcDiameter === circle2.calcDiameter); // true
