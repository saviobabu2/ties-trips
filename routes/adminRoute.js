const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Admin Route');
});

module.exports = router; // Ensure you export the router
