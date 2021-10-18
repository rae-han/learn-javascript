function normal () {
  console.log(this)
  console.log(arguments);
  // console.log(super);
  console.log(new.target);
}

const arrow = () => {
  console.log(this)
  console.log(arguments);
  // console.log(super);
  console.log(new.target);
}

new normal(1, 2);
console.log(`######## ######## ######## ######## ######## ######## ######## ######## `)
arrow(1, 2);