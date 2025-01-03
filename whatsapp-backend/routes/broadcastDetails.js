var express = require('express');
var broadcastDetails = require('../models/broadcastDetails'); // Correctly imported model
var router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

/* GET users listing. */
router.get('/check', function (req, res, next) {
  res.send('respond with a resource');
});

/* POST create user */
router.post('/create', async function (req, res, next) {
  const { name, createdDate, icon } = req.body;

  try {
    // Create and save user details

    const savedDetails = new broadcastDetails({
      name,
      createdDate,
      icon
    });
    console.log(savedDetails,"saving");
    await savedDetails.save();

    console.log('Broadcast saved successfully!');
    res.status(201).json({ message: 'Broadcast details saved successfully.' });
  } catch (err) {
    console.error('Error saving Broadcast user:', err);
    res.status(500).json({ message: 'Failed to save Broadcast details.', error: err.message });
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
    const allDetails = await broadcastDetails.find(); // Sort by lastMessageDate descending
    res.status(201).json({data:allDetails});
    console.log(allDetails)
  } catch (err) {
    console.error('Error fetchingUsers:', err);
    res.status(500).json({ message: 'Failed to fetch Details' });
  }
});



router.post('/edit',async function(req,res,next){
    try {
let {updatedData } = req.body; // Destructure the _id and updated data from the request body
  
    let _id = "67781c6051ceb1e18843297d";
  
      const updatedDocument = await broadcastDetails.findByIdAndUpdate(
        _id,            // Find the document by _id
        updatedData,    // Data to update
        { new: true }   // Option to return the updated document
      );
  
      if (!updatedDocument) {
        return res.status(404).json({ error: "Broadcast not found" });
      }
  
      res.status(200).json({ message: "Broadcast details updated successfully", data: updatedDocument });
    } catch (error) {
      res.status(500).json({ error: "An error occurred", details: error.message });
    }
  })
  

  
  module.exports = router;

