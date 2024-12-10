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

    // Fetch events from the backend
    async function fetchEvents() {
        try {
            const response = await fetch('/events');
            if (!response.ok) throw new Error('Failed to fetch events');
            events = await response.json();
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

    // Show the modal with event details
    function showModal(date, eventsForDay) {
        modalTitle.textContent = `Events on ${date}`;
        modalDetails.innerHTML = eventsForDay.length
            ? eventsForDay.map(event => `
                <div class="event-detail">
                    <h4>${event.name}</h4>
                    <p>${event.description || 'No description available'}</p>
                    <p><strong>Time:</strong> ${event.time || 'All Day'}</p>
                    <p><strong>Location:</strong> ${event.location || 'TBD'}</p>
                </div>
              `).join('')
            : '<p>No events for this day.</p>';

        modal.style.display = 'block';
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
