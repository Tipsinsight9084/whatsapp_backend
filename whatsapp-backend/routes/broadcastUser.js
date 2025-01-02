var express = require('express');
var broadcastuserModel = require('../models/broadcaseUsers'); // Correctly imported model
var router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

/* GET users listing. */
router.get('/check', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST create user */
router.post('/create', async function (req, res, next) {
  const { name, status, icon } = req.body;

  try {
    // Create and save user details

    const fetch = await broadcastuserModel.find();
    console.log("fetechd",fetch)
    const savedDetails = new broadcastuserModel({
      name,
      status,
      icon
    });
    console.log(savedDetails,"saving");
    await savedDetails.save();

    console.log('Broadcast User saved successfully!');
    res.status(201).json({ message: 'Broadcast User details saved successfully.' });
  } catch (err) {
    console.error('Error saving Broadcast user:', err);
    res.status(500).json({ message: 'Failed to save Broadcastuser details.', error: err.message });
  }
});

module.exports = router;
