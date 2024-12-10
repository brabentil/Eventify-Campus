document.addEventListener('DOMContentLoaded', () => {
    // Get the user object from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if the user is logged in and the user object exists
    if (user && user.name) {
        // Display the user's name in the appropriate element
        const userNameElement = document.getElementById('user-name');
        if (userNameElement) {
            userNameElement.textContent = user.name;
        }
    } else {
        // If no user is logged in, you might want to redirect to the login page
        window.location.href = '/login'; // Redirect to login page if no user found
    }
});
