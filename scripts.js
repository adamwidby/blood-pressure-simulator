
let hand = document.querySelector(".hand");

function getCurrentAnglePosition() {
    const handPosition = getComputedStyle(hand);
    const matrix = handPosition.getPropertyValue('transform');
    let angle = getAngleFromMatrix(matrix);
    return angle;
}

function iterateHand() {

    let angle = getCurrentAnglePosition();

    if (angle > 0 && angle < 90) {
        audio.play();
    } else {
        audio.pause();
    }

    if (checkAngle(angle) == false) {
        angle = angle-1;
    }
    hand.style.transform = `translate(65px, 292px) rotate(${angle}deg)`;
    console.log(angle);

};

function pump() {
    let angle = getCurrentAnglePosition();
    angle = angle + 30;
    hand.style.transform = `translate(65px, 292px) rotate(${angle}deg)`;
}


setInterval(iterateHand, 50);

// f will pump
document.addEventListener("keydown", (e) => {
    if (e.keyCode === 70) {
        pump();
    }
})


// audio
let audio = new Audio('audio/heartbeat-01a.mp3');

function bloodPressureAudio() {
    


};




// https://css-tricks.com/get-value-of-css-rotation-through-javascript/

function getAngleFromMatrix(matrix) {
    let values = matrix.split('(')[1];
    values = values.split(')')[0];
    values = values.split(',');
    let a = values[0];
    let b = values[1];
    let c = values[2];
    let d = values[3];

    let angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    return angle;
}

function checkAngle(angle) {
    if (angle == -90) {
        return true
    }
    return false

}