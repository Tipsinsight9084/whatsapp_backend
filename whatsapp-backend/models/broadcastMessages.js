// 2vAS3nuGKSVj4zuT
// mongodb+srv://surajjain8834:<db_password>@cluster0.nlax8.mongodb.net/




// const { name } = require('ejs');
const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');

// mongoose.connect(`mongodb+srv://pass:pass@eventcluster.blixsin.mongodb.net/`)
// mongoose.connect("mongodb://127.0.0.1:27017/Cricket")
let mongo_url = "mongodb+srv://surajjain8834:Ha6ZdfGSIHRjRi8u@cluster0.nlax8.mongodb.net/whatsapp?retryWrites=true&w=majority"
 let MONGO_URL = "mongodb+srv://akshaychauhan:askaychauhan@matchdatabase.hd4jvpk.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongo_url)
.then(() => 
{
    console.log('COnntedd in botad mesage!!!');
})
.catch((err) => {
    console.log('Errorrrr!!!', err);
})

const broadcaseMessageSchema = new mongoose.Schema({

  message: {
    type: String,
    required: true
  },
 
   MessageDate: {
    type: Date,
    default: null
  },

   messageType:{
    type:String,
    default: null
   }
   ,
   status:{
    type:String,
    default: null
   }
 
},{collection:'BroadcastMessages'});


const Broadcastmessages = mongoose.model('BroadcastMessages', broadcaseMessageSchema);

module.exports = Broadcastmessages;
