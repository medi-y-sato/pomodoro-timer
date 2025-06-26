const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workDurationInput = document.getElementById('work-duration');
const restDurationInput = document.getElementById('rest-duration');
const modeDisplay = document.getElementById('mode-display');
const chime = document.getElementById('chime');
const volumeSlider = document.getElementById('volume-slider');
const testChimeBtn = document.getElementById('test-chime-btn');

let timer;
let isRunning = false;
let isWorkMode = true;
let timeLeft = workDurationInput.value * 60;

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            chime.play();
            switchMode();
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timer);
}

function resetTimer() {
    pauseTimer();
    isWorkMode = true;
    modeDisplay.textContent = '作業';
    timeLeft = workDurationInput.value * 60;
    updateDisplay();
}

function switchMode() {
    isWorkMode = !isWorkMode;
    modeDisplay.textContent = isWorkMode ? '作業' : '休憩';
    timeLeft = (isWorkMode ? workDurationInput.value : restDurationInput.value) * 60;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
workDurationInput.addEventListener('change', () => {
    if (!isRunning && isWorkMode) {
        timeLeft = workDurationInput.value * 60;
        updateDisplay();
    }
});

restDurationInput.addEventListener('change', () => {
    if (!isRunning && !isWorkMode) {
        timeLeft = restDurationInput.value * 60;
        updateDisplay();
    }
});

volumeSlider.addEventListener('input', () => {
    chime.volume = volumeSlider.value;
});

testChimeBtn.addEventListener('click', () => {
    chime.play();
});

updateDisplay();