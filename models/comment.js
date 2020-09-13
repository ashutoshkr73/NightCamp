var mongoose= require('mongoose');
//Commnent schema
const newSchema = new mongoose.Schema({
   text: String,
    author: {
     id:{
         type : mongoose.Schema.Types.ObjectId,
         ref: 'User'
     },
     username : String
    }

})

var Comment= mongoose.model('Comment',newSchema);
module.exports =Comment;

