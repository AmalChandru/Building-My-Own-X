const input = -1;

// eslint-disable-next-line require-jsdoc
function encoder(input) {
  if (typeof input === "number") {
    return "i" + input + "e";
  }
}

console.log(typeof input);
console.log(encoder(input));
