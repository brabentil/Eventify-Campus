const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); 
const eventRoutes = require('./routes/eventRoute');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoute');
const notificationRoutes = require('./routes/notificationRoute');
const RSVPRoutes = require('./routes/RSVPRoute');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));


// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB(); // Call the connectDB function

app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/notifications', notificationRoutes);
app.use('/rsvps', RSVPRoutes);

// Routes
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' }); 
});




app.get('/unauthorized', (req, res) => {
  res.sendFile('unauthorizedPage.html', { root: './public/pages' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
