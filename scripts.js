const hand = document.querySelector('.hand');
const audio = new Audio('audio/heartbeat-03.mp3');
let lowPressure;
let highPressure;
const resultsDiv = document.querySelector('.results-container');

setInterval(iterateHand, 150);
setPressures();

// get random pressures rounded to the nearest 5
function setPressures() {
  deflate();
  resultsDiv.innerHTML = '';
  lowPressure = Math.round(randomIntFromInterval(50, 110) / 2) * 2;
  highPressure = lowPressure + Math.round(randomIntFromInterval(40, 60) / 2) * 2;
  console.log(`${lowPressure} and ${highPressure}`);
}

function getCurrentAnglePosition() {
  const handPosition = getComputedStyle(hand);
  const matrix = handPosition.getPropertyValue('transform');
  const angle = getAngleFromMatrix(matrix);
  return angle;
}

function iterateHand() {
  let angle = getCurrentAnglePosition();

  if (angle > convertPressureToAngle(lowPressure) && angle < convertPressureToAngle(highPressure)) {
    audio.play();
  } else {
    audio.pause();
  }

  if (checkAngle(angle) == false) {
    angle -= 1;
  }
  hand.style.transform = `translate(65px, 292px) rotate(${angle}deg)`;
}

function pump() {
  let angle = getCurrentAnglePosition();
  angle += 30;
  hand.style.transform = `translate(65px, 292px) rotate(${angle}deg)`;
}

function deflate() {
  hand.style.transform = `translate(65px, 292px) rotate(${-89}deg)`;
}

function displayResults() {
  resultsDiv.innerHTML = `Results: ${highPressure} / ${lowPressure}`;
}

// f will pump
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 70) {
    pump();
  }
});

// d will deflate
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 68) {
    deflate();
  }
});

// r will display results
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 82) {
    displayResults();
  }
});

// n will reset pressures (new simulation)
document.addEventListener('keydown', (e) => {
  if (e.keyCode === 78) {
    setPressures();
  }
});

// Convert pressure to gauge angle
function convertPressureToAngle(pressure) {
  return 1.125 * pressure - 90;
}

// https://css-tricks.com/get-value-of-css-rotation-through-javascript/

function getAngleFromMatrix(matrix) {
  let values = matrix.split('(')[1];
  values = values.split(')')[0];
  values = values.split(',');
  const a = values[0];
  const b = values[1];
  const c = values[2];
  const d = values[3];

  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle;
}

function checkAngle(angle) {
  if (angle == -90) {
    return true;
  }
  return false;
}

// rand int https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
