const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts'); // Import express-ejs-layouts
const bodyParser = require("body-parser");

dotenv.config(); // Load environment variables

const index = express();

// Middleware to set Cache-Control header
index.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Body parser middleware
index.use(express.json());
index.use(bodyParser.urlencoded({ extended: true }));

// Set up the view engine and views folder
index.set('view engine', 'ejs');
index.set('views', path.join(__dirname, 'views/user/pages'));

// Tell express-ejs-layouts where the layout file is
index.set('layout', 'layout');  // Assuming your layout file is 'layout.ejs' in the 'user' folder


// Serve static files
index.use(express.static(path.join(__dirname, 'public'))); // This will serve everything under "public"
index.use('/user', express.static(path.join(__dirname, 'public/user')));
index.use('/admin', express.static(path.join(__dirname, 'public/admin')));

// Set up express-ejs-layouts for layouts
index.use(expressLayouts);

// Define the routes (ensure these are correctly implemented)
const userRoute = require('./routes/userRoute');
index.use('/', userRoute);

const adminRoute = require('./routes/adminRoute');
index.use('/admin', adminRoute);

// Start the server
index.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    console.log(`Visit http://localhost:${process.env.PORT} to access the site`);
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));
