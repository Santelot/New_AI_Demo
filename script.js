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

// Function to update the progress bar
function updateProgressBar(activityCard) {
    const stepCards = activityCard.querySelectorAll('.step-card');
    const progressBar = document.querySelector('.progress');
    const totalSteps = stepCards.length;
    //We only show the progress, there's no option to track individual progress within the current activity.
    const progressPercentage = 100; // (completedSteps / totalSteps) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Show Activity card
const activityLinks = document.querySelectorAll('.activity-list a');
const activityCards = document.querySelectorAll('.activity-card');

// Hide all activity cards initially
activityCards.forEach(card => card.classList.remove('active'));

// Function to show the selected activity card
function showActivity(activityId) {
    activityCards.forEach(card => card.classList.remove('active'));
    const selectedActivity = document.getElementById(activityId);
    if (selectedActivity) {
        selectedActivity.classList.add('active');
        updateProgressBar(selectedActivity); // Update the progress bar when activity changes
    }
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
}