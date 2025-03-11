document.getElementById('email-link').addEventListener('click', function(e) {
    e.preventDefault();
    const user = 'aryanbansal1710';
    const domain = 'gmail.com';
    const email = user + '@' + domain;

    // Copy to clipboard
    navigator.clipboard.writeText(email)
        .then(() => {
            // Show notification
            const notification = document.getElementById('copy-notification');
            notification.classList.add('show');

            // Hide after 2 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        })
        .catch(err => {
            console.error('Could not copy email: ', err);
            alert('Could not copy email. Your browser may not support this feature.');
        });
});
