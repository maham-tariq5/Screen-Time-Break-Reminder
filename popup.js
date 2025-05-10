const popup = document.getElementById('popup');
const progressCircle = document.getElementById('progress');

// Constants for the progress ring
const totalSeconds = 20;
const fullDashOffset = 339.292;

// Block keyboard and mouse input
function preventAction(e) {
  e.preventDefault();
  e.stopPropagation();
}

function blockInput() {
  document.addEventListener('keydown', preventAction, true);
  document.addEventListener('mousedown', preventAction, true);
  document.addEventListener('click', preventAction, true);
}

function unblockInput() {
  document.removeEventListener('keydown', preventAction, true);
  document.removeEventListener('mousedown', preventAction, true);
  document.removeEventListener('click', preventAction, true);
}

// Start 20-second countdown
function startTimer() {
  let elapsed = 0;
  progressCircle.style.strokeDashoffset = fullDashOffset;
  blockInput();

  const interval = setInterval(() => {
    elapsed++;
    const percent = elapsed / totalSeconds;
    const offset = fullDashOffset * (1 - percent);
    progressCircle.style.strokeDashoffset = offset;

    if (elapsed >= totalSeconds) {
      clearInterval(interval);
      unblockInput();
      window.close();  // Close the popup tab
    }
  }, 1000);
}

// Run on load
startTimer();
