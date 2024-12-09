const express = require('express');
const bodyParser = require('body-parser');
const { setupKinde, protectRoute, getUser } = require('@kinde-oss/kinde-node-express');
const connectDB = require('./config/db'); 
const eventRoutes = require('./routes/eventRoute');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoute');
const notificationRoutes = require('./routes/notificationRoute');
const { isAdmin, isAuthenticated } = require('./middleware/auth');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

const config = {
  clientId: process.env.clientId,
  issuerBaseUrl: process.env.issuerBaseUrl,
  siteUrl: process.env.siteUrl,
  secret: process.env.secret,
  redirectUrl: process.env.redirectUrl,
  postLogoutRedirectUrl: process.env.postLogoutRedirectUrl,
  unAuthorisedUrl: process.env.unAuthorisedUrl,
  grantType: 'PKCE',
};

setupKinde(config, app);

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB(); // Call the connectDB function

app.use('/events', eventRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/notifications', notificationRoutes);

// Routes
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' }); 
});

// Set up static file serving for admin content (protected)
app.use('/admin', isAuthenticated, isAdmin, express.static(path.join(__dirname, 'public/pages/admin')));


app.get('/unauthorized', (req, res) => {
  res.sendFile('unauthorizedPage.html', { root: './public/pages' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
