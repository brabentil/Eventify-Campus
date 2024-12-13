const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); 
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files
const publicDir = path.join(__dirname, 'Public');
app.use(express.static(publicDir));
console.log('Static files served from:', publicDir);

// Connect to MongoDB
connectDB(); // Call the connectDB function

// Routes
app.use('/events', require('./routes/eventRoute'));
app.use('/users', require('./routes/userRoutes'));
app.use('/categories', require('./routes/categoryRoute'));
app.use('/notifications', require('./routes/notificationRoute'));
app.use('/rsvps', require('./routes/RSVPRoute'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Unauthorized route
app.get('/unauthorized', (req, res) => {
  res.sendFile(path.join(publicDir, 'pages', 'unauthorizedPage.html'));
});

// 404 fallback
app.use((req, res) => {
  console.error(`Route not found: ${req.url}`);
  res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
