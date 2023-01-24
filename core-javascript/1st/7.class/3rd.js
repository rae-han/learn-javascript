const Rectangle = class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

const Square = class extends Rectangle {
  constructor(width) {
    super(width, width);
  }

  getArea () {
    return super.getArea();
  }
}

const square = new Square(3);
console.log(square.getArea());