# Eventify

Eventify is a comprehensive campus event management system designed for students and staff to seamlessly view, create, and register for various campus events such as workshops, seminars, and club activities. The platform integrates RSVP functionality, an event calendar, and notifications to ensure efficient event coordination.

---

## Table of Contents

- [Deployment Link](#deployment-link)
- [Sample Login Details](#sample-login-details)
- [Feature Checklist](#feature-checklist)
- [Tech Stack](#tech-stack)
- [Installation Instructions](#installation-instructions)
- [API Documentation](#api-documentation)
  - [Category Endpoints](#categories-endpoints)
  - [Event Endpoints](#event-endpoints)
  - [RSVP Endpoints](#rsvp-endpoints)
  - [User Endpoints](#user-endpoints)
- [Screenshots](#screenshots)

---

## Deployment Link

Access Eventify live via the following link:
[Eventify on Render](https://eventify-campus.onrender.com/)

---

## Sample Login Details

### Admin Functions
- **Email:** [admin@example.com](mailto:admin@example.com)
- **Password:** admin123

### User Functions
- Create an account using the registration form available on the platform.

---
## Feature Checklist

| **Feature**                          | **Details**                                                                                            | **Status**        |
|--------------------------------------|--------------------------------------------------------------------------------------------------------|-------------------|
| **User Registration & Event Preferences** |                                                                                                        | ✅ Completed       |
|                                      | User registration and login functionality implemented.                                                 | ✅ Completed       |
|                                      | Users can set preferences for specific event types.                                                    | ✅ Completed       |
| **Event Listings & RSVP**            |                                                                                                        | ✅ Completed       |
|                                      | Display of upcoming events with the following details:                                                 | ✅ Completed       |
|                                      | - Event name                                                                                           | ✅ Completed       |
|                                      | - Date and time                                                                                        | ✅ Completed       |
|                                      | - Location                                                                                            | ✅ Completed       |
|                                      | - Available seats                                                                                     | ✅ Completed       |
|                                      | Users can RSVP for events:                                                                             | ✅ Completed       |
|                                      | - Updates available seats in real-time.                                                               | ✅ Completed       |
|                                      | - Stores RSVP'd events in the user's profile.                                                         | ✅ Completed       |
| **Event Creation (Admin Only)**      |                                                                                                        | ✅ Completed       |
|                                      | Admins can create events by providing:                                                                 | ✅ Completed       |
|                                      | - Event name                                                                                           | ✅ Completed       |
|                                      | - Date and location                                                                                    | ✅ Completed       |
|                                      | - Description                                                                                          | ✅ Completed       |
|                                      | - Event capacity                                                                                       | ✅ Completed       |
|                                      | Each event is assigned a unique ID.                                                                    | ✅ Completed       |
| **Event Calendar View**              |                                                                                                        | ✅ Completed       |
|                                      | Integrated calendar view for visualizing events by date.                                               | ✅ Completed       |
|                                      | Users can filter events based on their preferences.                                                    | ✅ Completed       |

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

### Categories Endpoints
Endpoints for managing event categories, including creation, deletion, updates, and retrieval.

#### Create Category
![Create Category](Public/assets/endpoint-test/categories/Create-category.png)

#### Delete Category
![Delete Category](Public/assets/endpoint-test/categories/delete-category.png)

#### Get Categories
![Get Categories](Public/assets/endpoint-test/categories/get-categories.png)

#### Get Category
![Get Category](Public/assets/endpoint-test/categories/get-category.png)

#### Update Category
![Update Category](Public/assets/endpoint-test/categories/update-category.png)

---

### Event Endpoints
Endpoints for managing events, including CRUD operations and specific field updates.

#### Create Event
![Create Event](Public/assets/endpoint-test/events/create-event.png)

#### Delete Event
![Delete Event](Public/assets/endpoint-test/events/delete-event.png)

#### Get Event
![Get Event](Public/assets/endpoint-test/events/get-event.png)

#### Update Event Field
![Update Event Field](Public/assets/endpoint-test/events/update-event-field.png)

#### Update Event
![Update Event](Public/assets/endpoint-test/events/update-event.png)

---

### RSVP Endpoints
Endpoints for handling RSVP-related operations.

#### Create RSVP
![Create RSVP](Public/assets/endpoint-test/rsvps/create-rsvp.png)

#### Delete RSVP
![Delete RSVP](Public/assets/endpoint-test/rsvps/delete-rsvp.png)

#### Get RSVP
![Get RSVP](Public/assets/endpoint-test/rsvps/get-rsvp.png)

#### Get RSVPs
![Get RSVPs](Public/assets/endpoint-test/rsvps/get-rsvps.png)

---

### User Endpoints
Endpoints for user management, including creation, authentication, and retrieval.

#### Delete User
![Delete User](Public/assets/endpoint-test/user/delete-user.png)

#### Get User
![Get User](Public/assets/endpoint-test/user/get-user.png)

#### Get Users
![Get Users](Public/assets/endpoint-test/user/get-users.png)

#### Register User
![Register User](Public/assets/endpoint-test/user/register-user.png)

#### User Login
![User Login](Public/assets/endpoint-test/user/user-login.png)

---

## Screenshots

#### Home Page
![Home Page](Public/assets/ui/home.png)

#### Features Section
![Features Section](Public/assets/ui/features.png)

#### Login Page
![Login Page](Public/assets/ui/login.png)

#### User Dashboard
![User Dashboard](Public/assets/ui/user-dashboard.png)

#### Event Calendar
![Event Calendar](Public/assets/ui/event-calendar.png)

---

Thank you for using Eventify!

