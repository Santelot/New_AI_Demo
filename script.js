// script.js

// Theme Toggle
const themeToggleInput = document.getElementById('theme-toggle-input');
const body = document.body;

// Function to set the theme based on local storage
function setTheme() {
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        themeToggleInput.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggleInput.checked = false;
    }
}

// Call setTheme on page load
setTheme();

// Event listener for theme toggle
themeToggleInput.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'true');
    } else {
        localStorage.setItem('dark-mode', 'false');
    }
});

// Collapsible Sections
const collapsibleButtons = document.querySelectorAll('.collapsible-button');

collapsibleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});

// Show/Hide All Dialogues
const toggleDialoguesButton = document.getElementById('toggle-dialogues');
let dialoguesVisible = false;

toggleDialoguesButton.addEventListener('click', () => {
    const allCollapsibleContent = document.querySelectorAll('.collapsible-content');

    allCollapsibleContent.forEach(content => {
        content.style.display = dialoguesVisible ? 'none' : 'block';
    });

    toggleDialoguesButton.textContent = dialoguesVisible ? 'Show All Dialogues' : 'Hide All Dialogues';
    dialoguesVisible = !dialoguesVisible;
});

// Chronometer Functionality
const timer = document.getElementById('timer');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');

let interval;
let timeLeft = 0;
let timerRunning = false;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `⏱️ ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopTimer() {
    if (timerRunning) {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
    } else {
        interval = setInterval(() => {
            timeLeft++;
            updateTimerDisplay();
        }, 1000);
        startStopButton.textContent = 'Stop';
    }
    timerRunning = !timerRunning;
}

function resetTimer() {
    clearInterval(interval);
    timerRunning = false;
    timeLeft = 0;
    updateTimerDisplay();
    startStopButton.textContent = 'Start';
}

startStopButton.addEventListener('click', startStopTimer);
resetButton.addEventListener('click', resetTimer);

// Show Activity card
const activityLinks = document.querySelectorAll('.activity-list a');
const activityCards = document.querySelectorAll('.activity-card');
const progressBar = document.querySelector('.progress');
const numberOfActivities = activityCards.length;

// Hide all activity cards initially
activityCards.forEach(card => {
    card.classList.remove('active');
     card.style.display = 'none'; // Ensure all cards are initially hidden
});

// Function to show the selected activity card
function showActivity(activityId) {
    // Fade out the current active card
    const currentActive = document.querySelector('.activity-card.active');
    if (currentActive) {
        currentActive.classList.remove('active');
        setTimeout(() => {
            currentActive.style.display = 'none';
        }, 333); // Faster timeout
    }

    //Show the selected activity card and fade it in
    const selectedActivity = document.getElementById(activityId);
    if (selectedActivity) {
        selectedActivity.style.display = 'block';
        setTimeout(() => {
            selectedActivity.classList.add('active');
        }, 50);
       updateProgressBar(activityId);
    }
}

// Function to update the progress bar
function updateProgressBar(activityId) {
    const activityIndex = parseInt(activityId.split('-')[1]);
    const progressPercentage = (activityIndex / numberOfActivities) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Add event listeners to activity links
activityLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const activityId = link.getAttribute('href').substring(1); // Remove '#'
        showActivity(activityId);
    });
});

// Show the first activity by default
if (activityCards.length > 0) {
    showActivity(activityCards[0].id);
     updateProgressBar(activityCards[0].id);
}
