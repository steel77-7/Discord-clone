const mongoose = require ('mongoose');

const friendSchema = new mongoose.Schema({
   friends : {
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
    }
})

const Friend = mongoose.model('friends', friendSchema);


module.exports = Friend; 