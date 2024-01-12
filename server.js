const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your frontend)
app.use(express.static('final project/loginpage'));

// Database connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const User = mongoose.model('User', {
    email: String,
    password: String,
});

// POST route for user registration
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        // Save user with hashed password
        const user = new User({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
});

// POST route to handle login authentication
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // Passwords match, authentication successful
                res.status(200).json({ message: 'Login successful' });
            } else {
                // Passwords don't match
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            // User not found
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        // Handle database errors
        res.status(500).json({ message: 'Database error' });
    }
});

// Start server on port 3000 (or your desired port)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
