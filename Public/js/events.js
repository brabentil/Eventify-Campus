document.addEventListener('DOMContentLoaded', () => {
    const eventTypeSelect = document.getElementById('event-type');
    const eventDateInput = document.getElementById('event-date');
    const eventSearchInput = document.getElementById('event-search');
    const eventsGrid = document.querySelector('.events-grid');
    const spinner = document.getElementById('loading-spinner');

    // Modal elements
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.id = 'event-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn" id="close-modal">&times;</span>
            <h3 id="event-modal-title">Event Details</h3>
            <div id="event-modal-details"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModalBtn = modal.querySelector('#close-modal');
    const modalTitle = modal.querySelector('#event-modal-title');
    const modalDetails = modal.querySelector('#event-modal-details');

    let events = [];
    let userPreferences = [];

    // Simulated user object from localStorage
    const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : { preferences: [] };

    userPreferences = user.preferences.map(pref => pref.category);

    // Show spinner function
    function showSpinner() {
        spinner.style.display = 'flex';
    }

    // Hide spinner function
    function hideSpinner() {
        spinner.style.display = 'none';
    }

    // Fetch categories and populate dropdown with preferred categories
    async function fetchCategories() {
        try {
            showSpinner();

            const response = await fetch('/categories');
            if (!response.ok) throw new Error('Failed to fetch categories');
            const categories = await response.json();

            const preferredCategories = categories.filter(category =>
                userPreferences.includes(category._id)
            );

            eventTypeSelect.innerHTML = '<option value="all">All Types</option>';
            preferredCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category._id;
                option.textContent = category.name;
                eventTypeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            hideSpinner();
        }
    }

    // Fetch events and render
    async function fetchEvents() {
        try {
            showSpinner();

            const response = await fetch('/events');
            if (!response.ok) throw new Error('Failed to fetch events');
            const allEvents = await response.json();

            events = allEvents.filter(event => userPreferences.includes(event.category._id));

            renderEvents(events);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            hideSpinner();
        }
    }

    // Render events
    function renderEvents(events) {
        eventsGrid.innerHTML = '';

        if (events.length === 0) {
            eventsGrid.innerHTML = '<p>No events found matching your preferences.</p>';
            return;
        }

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-details">
                    <h3 class="event-title">${event.name}</h3>
                    <p class="event-date">${new Date(event.date).toLocaleString()}</p>
                    <p class="event-type">${event.category.name}</p>
                    <p class="event-description">${event.description || 'No description available'}</p>
                </div>
                <div class="event-actions">
                    <button class="btn btn-primary" data-event-id="${event._id}">View Details</button>
                </div>
            `;
            
            eventCard.querySelector('button').addEventListener('click', () => {
                console.log('Button clicked for event:', event);
                showModal(event);
            });

            eventsGrid.appendChild(eventCard);
        });
    }

    // Show the modal with event details and RSVP button
    function showModal(event) {
        console.log('Opening modal for event:', event);

        modalTitle.textContent = event.name;
        modalDetails.innerHTML = `
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleString()}</p>
            <p><strong>Category:</strong> ${event.category.name}</p>
            <p><strong>Description:</strong> ${event.description || 'No description available'}</p>
            <p><strong>Location:</strong> ${event.location || 'TBD'}</p>
            <p><strong>Available Seats:</strong> ${event.available_seats}</p>
            ${event.available_seats > 0 ? `<button class="rsvp-btn" data-event-id="${event._id}">RSVP</button>` : '<p>No seats available</p>'}
        `;

        modal.style.display = 'block';

        const rsvpButton = modal.querySelector('.rsvp-btn');
        if (rsvpButton) {
            rsvpButton.addEventListener('click', () => handleRSVP(event._id));
        }
    }

    // Handle RSVP functionality
    async function handleRSVP(eventID) {
        try {
            console.log('RSVP for event ID:', eventID);

            const response = await fetch('/rsvps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event: eventID, user: user.id })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to RSVP');
            }

            const event = events.find(e => e._id === eventID);
            event.available_seats -= 1;

            alert('RSVP successful!');
            renderEvents(events);
            modal.style.display = 'none';
        } catch (error) {
            alert(error.message);
        }
    }

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        console.log('Closing modal');
        modal.style.display = 'none';
    });

    // Filter events based on user input
    function filterEvents() {
        const selectedType = eventTypeSelect.value;
        const selectedDate = eventDateInput.value;
        const searchKeyword = eventSearchInput.value.toLowerCase();

        const filteredEvents = events.filter(event => {
            const matchesType = selectedType === 'all' || event.category._id === selectedType;
            const matchesDate = !selectedDate || new Date(event.date).toISOString().split('T')[0] === selectedDate;
            const matchesKeyword =
                !searchKeyword ||
                event.name.toLowerCase().includes(searchKeyword) ||
                event.description.toLowerCase().includes(searchKeyword);

            return matchesType && matchesDate && matchesKeyword;
        });

        renderEvents(filteredEvents);
    }

    // Event listeners for filter inputs
    eventTypeSelect.addEventListener('change', filterEvents);
    eventDateInput.addEventListener('input', filterEvents);
    eventSearchInput.addEventListener('input', filterEvents);

    // Initialize the page
    fetchCategories();
    fetchEvents();
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
