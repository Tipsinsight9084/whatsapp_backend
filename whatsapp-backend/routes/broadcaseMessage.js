var express = require('express');
var broadcastMessageModel = require('../models/broadcastMessages'); // Correctly imported model
var router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

/* GET users listing. */
router.get('/check', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST create user */
router.post('/create', async function (req, res, next) {
  const { message, MessageDate, messageType,status } = req.body;

  try {
    // Create and save user details
    const savedDetails = new broadcastMessageModel({
        message,
      MessageDate,
      messageType,
      status
    });
    await savedDetails.save();

    console.log('Broadcast Message saved successfully!');
    res.status(201).json({ message: 'Broadcast Message saved successfully.' });
  } catch (err) {
    console.error('Error saving  message:', err);
    res.status(500).json({ message: 'Failed to save Broadcase Message.', error: err.message });
  }
});

module.exports = router;
