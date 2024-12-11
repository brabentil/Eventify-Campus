document.addEventListener('DOMContentLoaded', () => {
    const eventTypeSelect = document.getElementById('event-type');
    const eventDateInput = document.getElementById('event-date');
    const eventSearchInput = document.getElementById('event-search');
    const eventsGrid = document.querySelector('.events-grid');
    const spinner = document.getElementById('loading-spinner'); // Spinner element

    let events = [];
    let userPreferences = [];

    // Simulated user object from localStorage
    const user = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : { preferences: [] };

    userPreferences = user.preferences.map(pref => pref.category);

    // Show spinner function
    function showSpinner() {
        spinner.style.display = 'flex'; // Show the spinner
    }

    // Hide spinner function
    function hideSpinner() {
        spinner.style.display = 'none'; // Hide the spinner
    }

    // Fetch categories and populate dropdown with preferred categories
    async function fetchCategories() {
        try {
            showSpinner(); // Show the spinner while fetching data

            const response = await fetch('/categories');
            if (!response.ok) throw new Error('Failed to fetch categories');
            const categories = await response.json();

            // Filter categories by user preferences
            const preferredCategories = categories.filter(category =>
                userPreferences.includes(category._id)
            );

            // Populate dropdown
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
            hideSpinner(); // Hide the spinner after categories are fetched
        }
    }

    // Fetch events and render
    async function fetchEvents() {
        try {
            showSpinner(); // Show the spinner while fetching data

            const response = await fetch('/events');
            if (!response.ok) throw new Error('Failed to fetch events');
            const allEvents = await response.json();

            // Filter events based on user preferences
            events = allEvents.filter(event => userPreferences.includes(event.category._id));

            renderEvents(events);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            hideSpinner(); // Hide the spinner after events are fetched
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
                    <button class="btn btn-primary">View Details</button>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });
    }

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
