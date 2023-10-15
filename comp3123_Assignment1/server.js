const express = require('express');
const userRoutes = require('./routes/users');
const employeeRoutes = require('./routes/employees');
const mongoose = require('mongoose');
const app = express();

const DB_CONNECTION_STRING = 'mongodb+srv://admin:admin@cluster0.kvivlmt.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;

// Handle MongoDB connection errors
database.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Confirm successful MongoDB connection
database.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});