document.addEventListener('DOMContentLoaded', () => {
    const calendarDays = document.getElementById('calendar-days');
    const monthYearLabel = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

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
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    // Simulated user object from localStorage
    const user = localStorage.getItem('user') 
        ? JSON.parse(localStorage.getItem('user')) 
        : { preferences: [], _id: 'testUserId' }; // Example user ID

    // Fetch events from the backend and filter based on user preferences
    async function fetchEvents() {
        try {
            const response = await fetch('/events');
            if (!response.ok) throw new Error('Failed to fetch events');
            const allEvents = await response.json();

            const userCategoryIds = user.preferences.map(({ category }) => category);

            // Filter events based on user preferences
            events = allEvents.filter(event => userCategoryIds.includes(event.category._id));
            renderCalendar();
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    // Render the calendar
    function renderCalendar() {
        calendarDays.innerHTML = '';
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0);

        const startDay = monthStart.getDay();
        const totalDays = monthEnd.getDate();

        monthYearLabel.textContent = `${monthStart.toLocaleString('default', { month: 'long' })} ${currentYear}`;

        // Render empty cells before the start of the month
        for (let i = 0; i < startDay; i++) {
            calendarDays.innerHTML += `<div class="calendar-day-cell empty"></div>`;
        }

        // Render days of the month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
            const eventsForDay = events.filter(event => new Date(event.date).toISOString().split('T')[0] === date);

            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day-cell';
            dayCell.dataset.date = date;
            dayCell.innerHTML = `
                <span class="calendar-day-number">${day}</span>
                ${eventsForDay.length > 0 ? `<div class="event-marker"><span class="event-count">${eventsForDay.length}</span></div>` : ''}
            `;

            // Add click event listener for modal
            dayCell.addEventListener('click', () => showModal(date, eventsForDay));

            calendarDays.appendChild(dayCell);
        }
    }

    // Show the modal with event details and RSVP button
    function showModal(date, eventsForDay) {
        modalTitle.textContent = `Events on ${date}`;
        modalDetails.innerHTML = eventsForDay.length
            ? eventsForDay.map(event => `
                <div class="event-detail" id="event-${event._id}">
                    <h4>${event.name}</h4>
                    <p>${event.description || 'No description available'}</p>
                    <p><strong>Time:</strong> ${event.time || 'All Day'}</p>
                    <p><strong>Location:</strong> ${event.location || 'TBD'}</p>
                    <p><strong>Available Seats:</strong> ${event.available_seats}</p>
                    ${event.available_seats > 0 ? `<button class="rsvp-btn" data-event-id="${event._id}">RSVP</button>` : '<p>No seats available</p>'}
                </div>
              `).join('')
            : '<p>No events for this day.</p>';

        modal.style.display = 'block';

        // Attach RSVP button listeners
        const rsvpButtons = modal.querySelectorAll('.rsvp-btn');
        rsvpButtons.forEach(button => {
            button.addEventListener('click', () => handleRSVP(button.dataset.event));
        });
    }

    // Handle RSVP functionality
    async function handleRSVP(eventID) {
        try {
            // Check if the user is already RSVP'd
            const response = await fetch('/rsvps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event: eventID, user: user._id })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to RSVP');
            }

            // Update the event on success
            const event = events.find(e => e._id === eventId);
            event.attendees.push(user._id);
            event.available_seats -= 1;

            // Send updated event object to the server
            await fetch(`/events/${eventId}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ attendees: event.attendees, available_seats: event.available_seats })
            });

            // Update the modal UI dynamically
            const eventDetail = modal.querySelector(`#event-${eventId}`);
            const availableSeatsEl = eventDetail.querySelector('p:nth-child(5)');
            availableSeatsEl.textContent = `Available Seats: ${event.available_seats}`;

            if (event.available_seats === 0) {
                const rsvpBtn = eventDetail.querySelector('.rsvp-btn');
                rsvpBtn.replaceWith('<p>No seats available</p>');
            }

            alert('RSVP successful!');
        } catch (error) {
            alert(error.message);
        }
    }

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Handle navigation buttons
    prevMonthBtn.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear -= 1;
        } else {
            currentMonth -= 1;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear += 1;
        } else {
            currentMonth += 1;
        }
        renderCalendar();
    });

    // Initialize calendar
    fetchEvents();
});