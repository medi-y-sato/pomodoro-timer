
// Type Definitions
type Mode = '作業' | '休憩';

interface AppState {
    timerId: number | null;
    isRunning: boolean;
    currentMode: Mode;
    timeLeft: number;
    cycleCount: number;
}

// DOM Elements
const timerDisplay = document.getElementById('timer-display') as HTMLDivElement;
const startBtn = document.getElementById('start-btn') as HTMLButtonElement;
const pauseBtn = document.getElementById('pause-btn') as HTMLButtonElement;
const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;
const workDurationInput = document.getElementById('work-duration') as HTMLInputElement;
const restDurationInput = document.getElementById('rest-duration') as HTMLInputElement;
const modeDisplay = document.getElementById('mode-display') as HTMLSpanElement;
const cycleCountDisplay = document.getElementById('cycle-count-display') as HTMLSpanElement;
const autoStartCheckbox = document.getElementById('auto-start') as HTMLInputElement;
const chime = document.getElementById('chime') as HTMLAudioElement;
const volumeSlider = document.getElementById('volume-slider') as HTMLInputElement;
const testChimeBtn = document.getElementById('test-chime-btn') as HTMLButtonElement;

// Constants
const MODES: { [key: string]: Mode } = {
    WORK: '作業',
    REST: '休憩',
};

// State
const state: AppState = {
    timerId: null,
    isRunning: false,
    currentMode: MODES.WORK,
    timeLeft: workDurationInput.valueAsNumber * 60,
    cycleCount: 0,
};

// --- UI Update Functions ---

function updateTimerDisplay(): void {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = timeString;
    document.title = `${timeString} - ${state.currentMode}`;
}

function updateModeDisplay(): void {
    modeDisplay.textContent = state.currentMode;
}

function updateCycleCountDisplay(): void {
    cycleCountDisplay.textContent = state.cycleCount.toString();
}

function updateControls(): void {
    startBtn.disabled = state.isRunning;
    pauseBtn.disabled = !state.isRunning;
    workDurationInput.disabled = state.isRunning;
    restDurationInput.disabled = state.isRunning;
}

// --- Timer Logic Functions ---

function startTimer(): void {
    if (state.isRunning) return;

    state.isRunning = true;
    updateControls();

    state.timerId = window.setInterval(() => {
        state.timeLeft--;
        updateTimerDisplay();
        if (state.timeLeft <= 0) {
            chime.play();
            switchMode();
        }
    }, 1000);
}

function pauseTimer(): void {
    if (!state.isRunning || state.timerId === null) return;

    state.isRunning = false;
    clearInterval(state.timerId);
    state.timerId = null;
    updateControls();
}

function resetTimer(): void {
    pauseTimer();
    state.currentMode = MODES.WORK as Mode;
    state.timeLeft = workDurationInput.valueAsNumber * 60;
    state.cycleCount = 0;
    updateModeDisplay();
    updateTimerDisplay();
    updateCycleCountDisplay();
}

function switchMode(): void {
    if (state.currentMode === MODES.WORK) {
        state.currentMode = MODES.REST as Mode;
        state.timeLeft = restDurationInput.valueAsNumber * 60;
    } else {
        state.currentMode = MODES.WORK as Mode;
        state.timeLeft = workDurationInput.valueAsNumber * 60;
        state.cycleCount++;
        updateCycleCountDisplay();
    }

    updateModeDisplay();
    updateTimerDisplay();

    if (autoStartCheckbox.checked) {
        // Short delay before auto-starting to allow the chime to play
        setTimeout(() => startTimer(), 100); 
    } else {
        pauseTimer();
    }
}

// --- Event Handlers ---

function handleDurationChange(): void {
    if (state.isRunning) return;
    if (state.currentMode === MODES.WORK) {
        state.timeLeft = workDurationInput.valueAsNumber * 60;
    } else {
        state.timeLeft = restDurationInput.valueAsNumber * 60;
    }
    updateTimerDisplay();
}

function handleVolumeChange(): void {
    chime.volume = volumeSlider.valueAsNumber;
}

function handleTestChime(): void {
    chime.play();
}

// --- Initialization ---

function init(): void {
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
