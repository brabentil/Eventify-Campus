document.addEventListener('DOMContentLoaded', async () => {
// Get the user object from localStorage
 const user = JSON.parse(localStorage.getItem('user'));

 // Check if the user is logged in and the user object exists
 if (!user || !user.id) {
     // Redirect to login page if no user found
     window.location.href = '/login';
     return;
 }

 // Display the user's name in the appropriate element
 const userNameElement = document.getElementById('user-name');
 if (userNameElement) {
     userNameElement.textContent = user.name;
 }


});
