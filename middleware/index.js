
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware ={};

middleware.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,(err,camp)=>{
            if(err) 
                res.redirect('back');
             else{
                 if(camp.author.id.equals(req.user._id)){
                     next();
                 }
                 else{
                     res.send('YOU DO NOT HAVE PERMIT TO DO THAT.')
                 }
               }
        })
     }else{
         res.redirect('back');
     }
}

middleware.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,(err,foundcomment)=>{
            if(err) 
                res.redirect('back');
             else{
                 if(foundcomment.author.id.equals(req.user._id)){
                     next();
                 }
                 else{
                     res.send('YOU DO NOT HAVE PERMIT TO DO THAT.')
                 }
               }
        })
     }else{
         res.redirect('back');
     }
}

middleware.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports= middleware;