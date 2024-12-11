// Import required modules
const mongoose = require('mongoose');
const fs = require('fs');

// Define the MongoDB URI (update with your actual connection string)
const mongoURI = 'mongodb+srv://brabentil:CHlDkHamHwPm0seS@eventifydb.k21s5.mongodb.net/?retryWrites=true&w=majority&appName=EventifyDB';

// Connect to the MongoDB database
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Import the Event model (update the path to your model file if necessary)
const Event = require('./models/EventModel');

// Path to the JSON file with events data
const eventsFilePath = './updated_events.json';

// Function to populate the events collection
async function populateEvents() {
  try {
    // Read the JSON file
    const data = fs.readFileSync(eventsFilePath, 'utf8');
    const events = JSON.parse(data);

    // Insert the events into the database
    const result = await Event.insertMany(events);
    console.log(`${result.length} events inserted successfully.`);
    
    // Close the database connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error populating events:', err);
    mongoose.connection.close();
  }
}

// Call the function to populate events
populateEvents();
