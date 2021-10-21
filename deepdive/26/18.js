// const returnObject = ({ x, y }) => { x, y };
const returnObject = ({ x, y }) => ({ x, y });

console.log(returnObject({ x: 1, y: 2 })); // { x: 1, y: 2 }