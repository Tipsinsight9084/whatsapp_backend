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

router.post('/delete', async function (req, res, next) {
  const { _id } = req.body; // Use req.query for GET parameters
console.log("id",_id)
  if (!_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }
 const deletedMessage = await broadcastMessageModel.findByIdAndDelete(_id)
    .then(() => {
      console.log('Message deleted successfully');
      res.status(200).json({ message: 'Message deleted successfully' });
    })
    .catch((err) => {
      console.error('Error in deleting message:', err);
      res.status(500).json({ message: 'Failed to delete the message.' });
    });
});


router.get('/list',async function (req,res,next) {
  
  try {
    const allMessages = await broadcastMessageModel.find().sort({ MessageDate: 1 }); // Sort by lastMessageDate descending
    res.status(201).json({data:allMessages});
    console.log(allMessages)
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

module.exports = router;
