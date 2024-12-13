// Script for Event Management Page

// DOMContentLoaded to ensure DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    populateEventCategories();
    fetchEventList();

    // Attach event listeners
    document.getElementById('event-category-filter').addEventListener('change', filterEvents);
    document.getElementById('event-status-filter').addEventListener('change', filterEvents);
    document.querySelector('.search-bar button').addEventListener('click', searchEvents);
    document.querySelector('.add-new-event form').addEventListener('submit', addNewEvent);
});

// Fetch and populate event categories in dropdowns
async function populateEventCategories() {
    try {
        const response = await fetch('/categories'); // Replace with the correct backend route
        if (!response.ok) throw new Error('Failed to fetch categories');

        const categories = await response.json();
        const categoryFilter = document.getElementById('event-category-filter');
        const categoryDropdown = document.getElementById('event-category');

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category._id;
            option.textContent = category.name;

            categoryFilter.appendChild(option.cloneNode(true));
            categoryDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Fetch and display the list of events
async function fetchEventList() {
    try {
        const response = await fetch('/events'); // Replace with the correct backend route
        if (!response.ok) throw new Error('Failed to fetch events');

        const events = await response.json();
        renderEventList(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Render the event list into the table
function renderEventList(events) {
    const eventTableBody = document.querySelector('.event-list tbody');
    eventTableBody.innerHTML = '';

    events.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${new Date(event.date).toLocaleDateString()}</td>
            <td>${event.category.name}</td>
            <td>${event.status}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteEvent('${event._id}')">Delete</button>
            </td>
        `;
        eventTableBody.appendChild(row);
    });
}

// Filter events based on category and status
async function filterEvents() {
    const category = document.getElementById('event-category-filter').value;
    const status = document.getElementById('event-status-filter').value;

    try {
        const response = await fetch(`/events?category=${category}&status=${status}`); 
        if (!response.ok) throw new Error('Failed to filter events');

        const events = await response.json();
        renderEventList(events);
    } catch (error) {
        console.error('Error filtering events:', error);
    }
}

// Search for events
async function searchEvents() {
    const query = document.querySelector('.search-bar input').value.trim();

    try {
        const response = await fetch(`/events?search=${query}`); 
        if (!response.ok) throw new Error('Failed to search events');

        const events = await response.json();
        renderEventList(events);
    } catch (error) {
        console.error('Error searching events:', error);
    }
}

// Delete an event
async function deleteEvent(eventId) {
    try {
        const response = await fetch(`/events/${eventId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete event');

        fetchEventList(); // Refresh event list
    } catch (error) {
        console.error('Error deleting event:', error);
    }
}

// Add a new event
async function addNewEvent(event) {
    event.preventDefault();

    // Gather form data
    const name = document.getElementById('event-name').value.trim();
    const description = document.getElementById('event-description').value.trim();
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const location = document.getElementById('event-location').value.trim();
    const category = document.getElementById('event-category').value;
    const capacity = parseInt(document.getElementById('event-capacity').value, 10);
    const status = document.getElementById('event-status').value;

    // Retrieve user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
        alert("User not authenticated. Please log in.");
        return;
    }

    // Validation
    if (!name || !date || !time || !location || !category || isNaN(capacity)) {
        alert("Please fill out all required fields.");
        return;
    }

    // Prepare event data
    const newEvent = {
        name,
        description,
        date,
        time,
        location,
        category,
        capacity,
        available_seats: capacity,
        status,
        created_by: user.id
    };

    try {
        // Send a POST request to create the event
        const response = await fetch('/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Failed to create event');
        }

        alert("Event created successfully!");
        document.getElementById('event-form').reset(); // Clear form
        fetchEventList(); // Update the event list dynamically if function exists
    } catch (error) {
        console.error('Error creating event:', error);
        alert("An error occurred while creating the event. Please try again.");
    }
}
function logout(event) {
    event.preventDefault();
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
        window.location.href =  window.location.href = '../auth/logout.html';
    } else {
        console.log("Logout cancelled");
    }
}

