# Eventify

Eventify is a campus event management system that allows students and staff to view, create, and register for campus events such as workshops, seminars, and club activities. The platform includes features like RSVP, event calendar, and notifications to ensure seamless event management.

---

## Table of Contents

- [Deployment Link](#deployment-link)
- [Sample Login Details](#sample-login-details)
- [Feature Checklist](#feature-checklist)
- [Tech Stack](#tech-stack)
- [Installation Instructions](#installation-instructions)
- [API Documentation](#api-documentation)
  - [Category Endpoints](#1-categories-endpoints)
  - [Event Endpoints](#2-events-endpoints)
  - [RSVP Endpoints](#3-rsvps-endpoints)
  - [User Endpoints](#4-user-endpoints)
- [Screenshots](#screenshots)

---

## Deployment Link

You can access Eventify live on Render:
[Eventify on Render](https://eventify-campus.onrender.com/)

---

## Sample Login Details

If authentication is required, you can use the following test login credentials:

### Admin Functions

- **Username:** [admin@example.com](mailto:admin@example.com)
- **Password:** admin123

### User Functions

- Create an account using the registration form on the platform.

---

## Feature Checklist

### User Registration & Event Preferences
- [x] User registration and login functionality implemented.
- [x] Users can set preferences for event types.

### Event Listings & RSVP
- [x] Display upcoming events with details, including:
  - Event name
  - Date and time
  - Location
  - Available seats
- [x] Users can RSVP for events:
  - Updates available seats in real-time.
  - Stores RSVP'd events in the user's profile.

### Event Creation (Admin Only)
- [x] Admin-exclusive feature to create events.
- [x] Admins can provide event details, including:
  - Event name
  - Date and location
  - Description
  - Event capacity
- [x] Each event is assigned a unique ID.

### Event Calendar View
- [x] Integrated calendar view to display events by date.
- [x] Users can filter events based on their preferences.

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Deployment:** Render

---

## Installation Instructions

To run the project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/eventify.git
cd eventify
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add the following:

```env
PORT=3000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

### 4. Start the Server
```bash
npm start
```

### 5. Access the Frontend
Navigate to the `Public` directory and open `index.html` in your browser.

---

## API Documentation

### 1. Categories Endpoints
The following endpoints handle operations related to **categories**, such as creating, deleting, updating, and retrieving categories.

#### Create Category
![Create Category Test](Public/assets/endpoint-test/categories/Create-category.png)

#### Delete Category
![Delete Category Test](Public/assets/endpoint-test/categories/delete-category.png)

#### Get Categories
![Get Categories Test](Public/assets/endpoint-test/categories/get-categories.png)

#### Get Category
![Get Category Test](Public/assets/endpoint-test/categories/get-category.png)

#### Update Category
![Update Category Test](Public/assets/endpoint-test/categories/update-category.png)

---

### 2. Events Endpoints
Endpoints related to **events** include CRUD operations, as well as specific field updates.

#### Create Event
![Create Event Test](Public/assets/endpoint-test/events/create-event.png)

#### Delete Event
![Delete Event Test](Public/assets/endpoint-test/events/delete-event.png)

#### Get Event
![Get Event Test](Public/assets/endpoint-test/events/get-event.png)

#### Update Event Field
![Update Event Field Test](Public/assets/endpoint-test/events/update-event-field.png)

#### Update Event
![Update Event Test](Public/assets/endpoint-test/events/update-event.png)

---

### 3. RSVPs Endpoints
Testing endpoints for **RSVP** operations ensures guests' responses can be created, updated, and retrieved seamlessly.

#### Create RSVP
![Create RSVP Test](Public/assets/endpoint-test/rsvps/create-rsvp.png)

#### Delete RSVP
![Delete RSVP Test](Public/assets/endpoint-test/rsvps/delete-rsvp.png)

#### Get RSVP
![Get RSVP Test](Public/assets/endpoint-test/rsvps/get-rsvp.png)

#### Get RSVPs
![Get RSVPs Test](Public/assets/endpoint-test/rsvps/get-rsvps.png)

---

### 4. User Endpoints
Endpoints for **user management** include user creation, login, and deletion operations.

#### Delete User
![Delete User Test](Public/assets/endpoint-test/user/delete-user.png)

#### Get User
![Get User Test](Public/assets/endpoint-test/user/get-user.png)

#### Get Users
![Get Users Test](Public/assets/endpoint-test/user/get-users.png)

#### Register User
![Register User Test](Public/assets/endpoint-test/user/register-user.png)

#### User Login
![User Login Test](Public/assets/endpoint-test/user/user-login.png)

---

## Screenshots

#### Home Page
![Home](Public/assets/ui/home.png)

#### Features Section
![Features](Public/assets/ui/features.png)

#### Login Page
![Login](Public/assets/ui/login.png)

#### User Dashboard
![User Dashboard](Public/assets/ui/user-dashboard.png)

#### Event Calendar
![Event Calendar](Public/assets/ui/event-calendar.png)

---

Thank you for using Eventify!
