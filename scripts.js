
let hand = document.querySelector(".hand");

function getHandPosition() {
    const handPosition = getComputedStyle(hand);
    console.log(handPosition.getPropertyValue('transform'));
}

setInterval(getHandPosition, 1000);