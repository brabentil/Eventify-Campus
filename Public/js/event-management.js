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
            option.value = category.id;
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
            <td>${event.category}</td>
            <td>${event.status}</td>
            <td>
                <button class="btn" onclick="viewEvent('${event.id}')">View</button>
                <button class="btn" onclick="editEvent('${event.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteEvent('${event.id}')">Delete</button>
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

// Add a new event
async function addNewEvent(event) {
    event.preventDefault();

    const name = document.getElementById('event-name').value.trim();
    const date = document.getElementById('event-date').value;
    const category = document.getElementById('event-category').value;
    const status = document.getElementById('event-status').value;

    const newEvent = { name, date, category, status };

    try {
        const response = await fetch('/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent),
        });

        if (!response.ok) throw new Error('Failed to add new event');

        fetchEventList(); // Refresh event list
        document.querySelector('.add-new-event form').reset();
    } catch (error) {
        console.error('Error adding new event:', error);
    }
}

// Placeholder for view event
function viewEvent(eventId) {
    alert(`View event with ID: ${eventId}`);
}

// Placeholder for edit event
function editEvent(eventId) {
    alert(`Edit event with ID: ${eventId}`);
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