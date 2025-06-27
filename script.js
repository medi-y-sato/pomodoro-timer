// DOM Elements
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workDurationInput = document.getElementById('work-duration');
const restDurationInput = document.getElementById('rest-duration');
const modeDisplay = document.getElementById('mode-display');
const cycleCountDisplay = document.getElementById('cycle-count-display');
const autoStartCheckbox = document.getElementById('auto-start');
const chime = document.getElementById('chime');
const volumeSlider = document.getElementById('volume-slider');
const testChimeBtn = document.getElementById('test-chime-btn');

// Constants
const MODES = {
    WORK: '作業',
    REST: '休憩',
};

// State
const state = {
    timerId: null,
    isRunning: false,
    currentMode: MODES.WORK,
    timeLeft: workDurationInput.value * 60,
    cycleCount: 0,
};

// --- UI Update Functions ---

function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = timeString;
    document.title = `${timeString} - ${state.currentMode}`;
}

function updateModeDisplay() {
    modeDisplay.textContent = state.currentMode;
}

function updateCycleCountDisplay() {
    cycleCountDisplay.textContent = state.cycleCount;
}

function updateControls() {
    startBtn.disabled = state.isRunning;
    pauseBtn.disabled = !state.isRunning;
    workDurationInput.disabled = state.isRunning;
    restDurationInput.disabled = state.isRunning;
}

// --- Timer Logic Functions ---

function startTimer() {
    if (state.isRunning) return;

    state.isRunning = true;
    updateControls();

    state.timerId = setInterval(() => {
        state.timeLeft--;
        updateTimerDisplay();
        if (state.timeLeft <= 0) {
            chime.play();
            switchMode();
        }
    }, 1000);
}

function pauseTimer() {
    if (!state.isRunning) return;

    state.isRunning = false;
    clearInterval(state.timerId);
    state.timerId = null;
    updateControls();
}

function resetTimer() {
    pauseTimer();
    state.currentMode = MODES.WORK;
    state.timeLeft = workDurationInput.value * 60;
    state.cycleCount = 0;
    updateModeDisplay();
    updateTimerDisplay();
    updateCycleCountDisplay();
}

function switchMode() {
    if (state.currentMode === MODES.WORK) {
        state.currentMode = MODES.REST;
        state.timeLeft = restDurationInput.value * 60;
    } else {
        state.currentMode = MODES.WORK;
        state.timeLeft = workDurationInput.value * 60;
        state.cycleCount++;
        updateCycleCountDisplay();
    }

    updateModeDisplay();
    updateTimerDisplay();

    if (autoStartCheckbox.checked) {
        startTimer();
    } else {
        // If auto-start is off, pause the timer and wait for user to start
        pauseTimer(); 
    }
}

// --- Event Handlers ---

function handleDurationChange() {
    if (state.isRunning) return;
    if (state.currentMode === MODES.WORK) {
        state.timeLeft = workDurationInput.value * 60;
    } else {
        state.timeLeft = restDurationInput.value * 60;
    }
    updateTimerDisplay();
}

function handleVolumeChange() {
    chime.volume = volumeSlider.value;
}

function handleTestChime() {
    chime.play();
}

// --- Initialization ---

function init() {
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    workDurationInput.addEventListener('change', handleDurationChange);
    restDurationInput.addEventListener('change', handleDurationChange);
    volumeSlider.addEventListener('input', handleVolumeChange);
    testChimeBtn.addEventListener('click', handleTestChime);

    updateTimerDisplay();
    updateModeDisplay();
    updateCycleCountDisplay();
    updateControls();
}

// Run initialization
init();