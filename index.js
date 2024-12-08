const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Eventify!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});