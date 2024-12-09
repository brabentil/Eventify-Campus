document.addEventListener('DOMContentLoaded', function () {
    (async () => {
        try {
            // Debugging: Check if KindeClient is loaded
            console.log("Is KindeClient defined?", typeof KindeClient !== 'undefined');
            if (typeof KindeClient === 'undefined') {
                throw new Error("KindeClient is not defined. Ensure the SDK script is loaded.");
            }

            // Initialize Kinde client
            const kinde = new KindeClient({
                client_id: "802d2594d04a4ec496b6ff9bf089ec3a",
                domain: "https://brabentil.kinde.com",
                redirect_uri: window.location.origin
            });

            // Attach button event listeners
            const registerButton = document.getElementById('register');
            const loginButton = document.getElementById('login');

            registerButton?.addEventListener('click', () => {
                console.log('Get Started button clicked!');
                kinde.login();
            });

            loginButton?.addEventListener('click', () => {
                console.log('Sign In button clicked!');
                kinde.login();
            });

        } catch (error) {
            console.error("Error initializing Kinde client:", error);
        }
    })();
});
