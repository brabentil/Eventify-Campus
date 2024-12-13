const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Event listener for form submission
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission

    const email = emailInput.value.toLowerCase(); // Convert email to lowercase
    const password = passwordInput.value;

    try {
        // Send a POST request to the login route
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200 && data.message === 'Login successful') {
            // Store the user and token in local storage
            localStorage.setItem('user', JSON.stringify(data.user)); 
            localStorage.setItem('token', data.token); 

            // Check the role and redirect accordingly
            if (data.user.role === 'admin') {
                window.location.href = '../admin/admin-dashboard.html'; 
            } else {
                window.location.href = '../user/dashboard.html'; 
            }
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred while logging in. Please try again.');
    }
});
