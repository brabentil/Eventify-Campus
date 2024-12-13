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
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB(); // Call the connectDB function

// Routes
app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/notifications', notificationRoutes);
app.use('/rsvps', RSVPRoutes);

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

// Unauthorized route
app.get('/unauthorized', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'unauthorizedPage.html'));
});

console.log('Hello World');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
