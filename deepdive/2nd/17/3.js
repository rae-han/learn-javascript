const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

const circle2 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle1.getDiameter(), circle2.getDiameter()); // 10 10
console.log(circle1.getDiameter === circle2.getDiameter); // false
