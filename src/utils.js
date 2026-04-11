function randInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function ratio(width, height) {
  return width / height;
}

export { randInRange, ratio };