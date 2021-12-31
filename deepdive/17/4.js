function Circle(radius = 1) {
  this.radius = radius;
  this.getDiameter = function() {
    return 2*this.radius;
  }
};

const circle1 = new Circle(5);
const circle2 = new Circle(10);
const circle3 = new Circle(10);

circle3.getDiameter = function() {
  return 3*this.radius;
}

console.log(circle1.getDiameter());
console.log(circle2.getDiameter());
console.log(circle3.getDiameter());
console.log(circle1.getDiameter === circle2.getDiameter);

// console.log(radius);
const circle4 = Circle(15);
console.log(radius);
