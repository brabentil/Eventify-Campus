document.addEventListener('DOMContentLoaded', async () => {
    try {
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

        // Fetch RSVP data from the server
        const rsvpResponse = await fetch('/rsvps');
        if (!rsvpResponse.ok) {
            throw new Error('Failed to fetch RSVPs');
        }
        const rsvps = await rsvpResponse.json();
        console.log(rsvps);

        // Filter RSVPs for the logged-in user
        const userRsvps = rsvps.filter(rsvp => rsvp.user._id === user.id);
        console.log(userRsvps);

        // Extract event IDs from the user's RSVPs
        const eventIds = userRsvps.map(rsvp => rsvp.event._id);
        console.log(eventIds);

        // Fetch event data from the server
        const eventsResponse = await fetch('/events');
        if (!eventsResponse.ok) {
            throw new Error('Failed to fetch events');
        }
        const events = await eventsResponse.json();

        // Filter events that match the RSVP'd event IDs
        const userEvents = events.filter(event => eventIds.includes(event._id));

        // Populate the RSVP'd events section
        const rsvpSection = document.querySelector('.dashboard-grid');
        if (rsvpSection) {
            rsvpSection.innerHTML = ''; // Clear existing content

            if (userEvents.length > 0) {
                userEvents.forEach(event => {
                    const eventCard = document.createElement('div');
                    eventCard.classList.add('dashboard-card');

                    eventCard.innerHTML = `
                        <h3>${event.name}</h3>
                        <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
                        <p>Time: ${new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <a href="event-details.html?id=${event.id}" class="dashboard-link">View Details</a>
                    `;

                    rsvpSection.appendChild(eventCard);
                });
            } else {
                rsvpSection.innerHTML = '<p>No RSVP’d events. Check out the event listings to RSVP to more!</p>';
            }
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        // Optionally display an error message to the user
        const rsvpSection = document.querySelector('.dashboard-grid');
        if (rsvpSection) {
            rsvpSection.innerHTML = '<p>Failed to load RSVP’d events. Please try again later.</p>';
        }
    }
});

function logout(event) {
    event.preventDefault();
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
        window.location.href =  window.location.href = '../auth/logout.html';
    } else {
        console.log("Logout cancelled");
    }
}


