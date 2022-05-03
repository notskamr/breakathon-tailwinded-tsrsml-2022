let countdownTime = 3 * 60
let time = 3 * 60; //minutes * 60 seconds
let refreshInterval = setInterval(updateCountdown, 1000); //update every 1 second

function updateCountdown() {
    const minutes = Math.floor(time / 60); // rounds a number DOWN to the nearest integer
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds; 
    const countdown = document.getElementById("countdown"); 
    countdown.innerHTML = `${minutes}:${seconds}`;

    time--;

    if (time < 0) { //stop the setInterval whe time = 0 to avoid negative time
        const event = new Event('timeOut')
        const form = document.getElementById('guess-pass-form')
        form.dispatchEvent(event)

        clearInterval(refreshInterval);

    }
}