// 2vAS3nuGKSVj4zuT
// mongodb+srv://surajjain8834:<db_password>@cluster0.nlax8.mongodb.net/




// const { name } = require('ejs');
const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');

// mongoose.connect(`mongodb+srv://pass:pass@eventcluster.blixsin.mongodb.net/`)
// mongoose.connect("mongodb://127.0.0.1:27017/Cricket")
let mongo_url = "mongodb+srv://surajjain8834:Ha6ZdfGSIHRjRi8u@cluster0.nlax8.mongodb.net/test?retryWrites=true&w=majority"
 let MONGO_URL = "mongodb+srv://akshaychauhan:askaychauhan@matchdatabase.hd4jvpk.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(mongo_url)
// .then(() => 
// {
//     console.log('COnntedd in borad caset users!!!');
// })
// .catch((err) => {
//     console.log('Errorrrr!!!', err);
// })

const broadcastdetailsSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  }, 
   icon: {
    type: String,
    default: null
  },

   createdDate:{
    type:Date,
    default: null
   }
 
},{collection:'BroadcastDetails'});


const BroadcastDetails = mongoose.model('BroadcastDetails', broadcastdetailsSchema);

module.exports = BroadcastDetails;
