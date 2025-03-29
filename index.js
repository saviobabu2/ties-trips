const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts'); // Import express-ejs-layouts
const index = express();
const bodyParser = require("body-parser");
dotenv.config(); // Load environment variables





// Middleware to set Cache-Control header
index.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});




// Middleware
index.use(express.json());
index.use(bodyParser.urlencoded({ extended: true }));




// Set EJS view engine
index.set('view engine', 'ejs');
index.set('views', path.join(__dirname, 'views'));




index.set('layout', 'user/layouts/layout');



// Serve static files
index.use(express.static(path.join(__dirname, 'public')));  // Serve the 'public' folder
index.use('/user', express.static(path.join(__dirname, 'public', 'user')));
index.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));



// Use express-ejs-layouts to apply the layout across views
index.use(expressLayouts);

// Use routes
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
