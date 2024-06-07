let startTime, updatedTime, difference, timerInterval;
let paused = true;
let lapArray = [];
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startTimer() {
    if (paused) {
        paused = false;
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTimer, 10);
        display.classList.add('pulse'); 
    }
}

function pauseTimer() {
    if (!paused) {
        paused = true;
        clearInterval(timerInterval);
        display.classList.remove('pulse'); 
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    paused = true;
    difference = 0;
    lapArray = [];
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    display.classList.remove('pulse');  
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    display.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function recordLap() {
    if (!paused) {
        lapArray.push(display.innerHTML);
        let lapItem = document.createElement('li');
        lapItem.className = 'list-group-item';
        lapItem.innerHTML = display.innerHTML;
        laps.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
