function countGridElement() {
  let count = 4;
  if (window.innerWidth > 1280) {
    count = 4;
  } else {
    count = Math.floor((window.innerWidth * 0.890625) / 270);
  }
  return count;
}

const gridCount = countGridElement();

const elemCount = gridCount * 4 === 4 ? 5 : gridCount * 4;

const shortFilmDuration = 40;

export { gridCount, elemCount, shortFilmDuration };
