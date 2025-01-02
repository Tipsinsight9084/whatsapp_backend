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
  if (!_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const deletedUser = await userModel.findByIdAndDelete(_id)
    .then(() => {
      console.log('User deleted successfully');
      res.status(200).json({ message: 'User deleted successfully' });
    })
    .catch((err) => {
      console.error('Error in deleting user:', err);
      res.status(500).json({ message: 'Failed to delete the user.' });
    });
});

router.post('/edit',async function(req,res,next){
  try {
    const { _id, ...updatedData } = req.body; // Destructure the _id and updated data from the request body

    if (!_id) {
      return res.status(400).json({ error: "Missing _id in the request body" });
    }

    const updatedDocument = await userModel.findByIdAndUpdate(
      _id,            // Find the document by _id
      updatedData,    // Data to update
      { new: true }   // Option to return the updated document
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "user details updated successfully", data: updatedDocument });
  } catch (error) {
    res.status(500).json({ error: "An error occurred", details: error.message });
  }
})


router.get('/list',async function (req,res,next) {
  
  try {
    const allUsers = await userModel.find().sort({ lastMessageDate: -1 }); // Sort by lastMessageDate descending
    res.status(201).json({data:allUsers});
    console.log(allUsers)
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;
