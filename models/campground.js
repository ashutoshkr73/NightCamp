 var mongoose= require('mongoose');
//user schema
const newSchema = new mongoose.Schema({
    name: String,
    image: String,
    description : String,
    author: {
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username : String
       },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

const Campground=mongoose.model("Yalpcamp",newSchema);
module.exports=Campground;