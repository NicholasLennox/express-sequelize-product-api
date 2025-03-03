## **Activity: Build an Express & Sequelize API**

**Objective:** Create a simple Express API using Sequelize with MySQL and .env configuration. You will implement a CRUD API for managing events.

### 1. Setup

- Initialize a new Node.js project.
- Install required packages (`express`, `sequelize`, `mysql2`, `dotenv`).
- Setup your project structure (`models`, `services`, `routes`).
- Configure a `.env` file for your database connection.

### 2. Model Creation

- Create a Sequelize model for an `Event` with appropriate fields.
- Implement validation rules with custom error messages (you can implement these later as you need them).

**Tips**: 
- [Validators](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/#validators) in sequelize docs.
- [Data Types](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types) in sequelize docs

```text
{
  id: auto incremented integer
  name: string,
  date: date only (yyy-mm-dd),
  location: string,
  capacity: integer,
  isOnline: boolean
}
```

**Note**: Sample data is provided in [point 5](#5-dummy-data)

Validation rules:
- Event name cannot be empty and less than 100 characters.
- Date must be a valid date and cannot be in the past.
- Location cannot be empty and less than 255 characters.
- Capacity must be a positive integer of at least 1.
- IsOnline must be a boolean (true or false).

### 3. Service Layer

- Create a service class to handle data access logic.
- The service should include methods for:
  - `add`
  - `getAll`
  - `getById`
  - `update`
  - `delete`

### 4. Routes (Controller)

- Implement routes using an Express Router (`api/v1/events`).
- Setup CRUD endpoints (`GET`, `POST`, `PUT`, `DELETE`).
- Ensure appropriate status codes are used (`200`, `201`, `400`, `404`, `500`, etc.).
- Handle validation errors gracefully in the `POST` and `PUT` endpoints, returning `400` status with the validation messages.

### 5. Dummy Data

- Add 20 instances of sample event data to help with testing.

```js
[
  {
    name: "Tech Conference 2025",
    date: "2025-05-15",
    location: "Oslo Convention Center",
    capacity: 500,
    isOnline: false
  },
  {
    name: "Jazz in the Park",
    date: "2025-07-10",
    location: "Central Park",
    capacity: 150,
    isOnline: false
  },
  {
    name: "Online Marketing Workshop",
    date: "2025-03-20",
    location: "Zoom",
    capacity: 50,
    isOnline: true
  },
  {
    name: "Food Truck Festival",
    date: "2025-06-05",
    location: "Oslo Waterfront",
    capacity: 1000,
    isOnline: false
  },
  {
    name: "Startup Pitch Night",
    date: "2025-04-12",
    location: "Innovation Hub",
    capacity: 200,
    isOnline: false
  },
  {
    name: "Coding Bootcamp",
    date: "2025-08-01",
    location: "Online",
    capacity: 30,
    isOnline: true
  },
  {
    name: "Art Exhibition",
    date: "2025-09-15",
    location: "City Gallery",
    capacity: 250,
    isOnline: false
  },
  {
    name: "Yoga Retreat",
    date: "2025-11-10",
    location: "Mountain Lodge",
    capacity: 40,
    isOnline: false
  },
  {
    name: "E-sports Tournament",
    date: "2025-12-01",
    location: "Gaming Arena",
    capacity: 500,
    isOnline: false
  },
  {
    name: "Web Development Webinar",
    date: "2025-02-15",
    location: "Webinar Platform",
    capacity: 100,
    isOnline: true
  },
  {
    name: "Business Networking Night",
    date: "2025-03-30",
    location: "Downtown Hotel",
    capacity: 75,
    isOnline: false
  },
  {
    name: "Charity Run",
    date: "2025-04-20",
    location: "City Stadium",
    capacity: 300,
    isOnline: false
  },
  {
    name: "Photography Workshop",
    date: "2025-06-25",
    location: "Riverside Studio",
    capacity: 20,
    isOnline: false
  },
  {
    name: "Music Festival",
    date: "2025-07-15",
    location: "Beachside Venue",
    capacity: 2000,
    isOnline: false
  },
  {
    name: "Virtual Cooking Class",
    date: "2025-05-10",
    location: "Online",
    capacity: 25,
    isOnline: true
  },
  {
    name: "Public Speaking Seminar",
    date: "2025-10-05",
    location: "Conference Hall",
    capacity: 100,
    isOnline: false
  },
  {
    name: "Language Exchange Meetup",
    date: "2025-01-20",
    location: "Café Central",
    capacity: 30,
    isOnline: false
  },
  {
    name: "Science Fair",
    date: "2025-11-15",
    location: "Exhibition Center",
    capacity: 500,
    isOnline: false
  },
  {
    name: "Film Screening",
    date: "2025-08-20",
    location: "Cinema House",
    capacity: 150,
    isOnline: false
  },
  {
    name: "Gardening Workshop",
    date: "2025-09-10",
    location: "Community Center",
    capacity: 50,
    isOnline: false
  }
]
```

**6. Bonus Tasks**

- Create a centralized error-handling middleware to avoid repeating validation extraction logic.
- Add filtering, sorting, and pagination support to the `getAll` endpoint.
