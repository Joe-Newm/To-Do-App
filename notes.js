function updateDateTime() {
    // create a new `Date` object
    const now = new Date();

    // define the options for formatting
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