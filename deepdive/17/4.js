function Circle(radius = 1) {
  this.radius = radius;
  this.getDiameter = function() {
    return 2*this.radius;
  }
};

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter());
console.log(circle2.getDiameter());

// console.log(radius);
const circle3 = Circle(15);
console.log(radius);
