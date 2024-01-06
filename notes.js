const noteTextarea = document.getElementById('note-input');
const addNoteBtn = document.getElementById("#new-note-button");

// Load the saved note from local storage when the page loads
function loadNoteInput () {
noteTextarea.value = localStorage.getItem('savedNote') || '';

// Add an input event listener to the textarea
noteTextarea.addEventListener('input', function() {
    // Save the note content to local storage
    localStorage.setItem('savedNote', this.value);
});
}

// puts time above note
function updateDateTime() {
    // new `Date` object
    const now = new Date();

    // define the options 
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // Use 12-hour clock format
    };

    // get the current date and time as a string
    const currentDateTime = now.toLocaleString(undefined, options);

    document.querySelector('.date').textContent = currentDateTime;
}

setInterval(updateDateTime, 1000)



