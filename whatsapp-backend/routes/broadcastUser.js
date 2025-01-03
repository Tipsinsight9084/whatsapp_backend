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

router.post('/delete', async function (req, res, next) {
  const { _id } = req.body; // Use req.query for GET parameters
console.log("id",_id)
  if (!_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
 const deletedMessage = await broadcastuserModel.findByIdAndDelete(_id)
    .then(() => {
      console.log('Broadcast user deleted successfully');
      res.status(200).json({ message: 'Broadcast user deleted successfully' });
    })
    .catch((err) => {
      console.error('Error in deleting message:', err);
      res.status(500).json({ message: 'Failed to delete the broadcase user.' });
    });
});


router.get('/list',async function (req,res,next) {
  
  try {
    const allUsers = await broadcastuserModel.find(); // Sort by lastMessageDate descending
    res.status(201).json({data:allUsers});
    console.log(allUsers)
  } catch (err) {
    console.error('Error fetchingUsers:', err);
    res.status(500).json({ message: 'Failed to fetch Users' });
  }
});

module.exports = router;


module.exports = router;
