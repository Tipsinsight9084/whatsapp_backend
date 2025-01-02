var express = require('express');
var userModel = require('../models/users'); // Correctly imported model
var router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

/* GET users listing. */
router.get('/check', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST create user */
router.post('/create', async function (req, res, next) {
  console.log(req.body,"body")
  const { name, status, icon, message, story, lastMessageDate, unread } = req.body;

  try {

    const users = await userModel.find();  
    console.log("users 1",users)  // Create and save user details
    const savedDetails = new userModel({
      name,
      status,
      icon,
      message,
      story,
      lastMessageDate,
      unread,
    });
    await savedDetails.save();

    console.log('User saved successfully!');
    res.status(201).json({ message: 'User details saved successfully.' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Failed to save user details.', error: err.message });
  }
});


router.post('/delete', async function (req, res, next) {
  const { _id } = req.body; // Use req.query for GET parameters
console.log("id",_id)
  if (!_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

 const suraj =  await userModel.find();
 console.log("su",suraj);
 const deletedUser = await userModel.findByIdAndDelete(_id)
    .then(() => {
      console.log('User deleted successfully');
      res.status(200).json({ message: 'User deleted successfully' });
    })
    .catch((err) => {
      console.error('Error in deleting user:', err);
      res.status(500).json({ message: 'Failed to delete the user.' });
    });

    console.log("D",deletedUser)
});

module.exports = router;
