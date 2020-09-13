
var express  = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment    = require('../models/comment.js');
const { route } = require('.');

var middleware = require('../middleware/index.js');



// ===========  comment ===================
router.get("/new",middleware.isLoggedIn, (req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
         if(err) console.log(err)
         else{
             res.render('comment/new',{camp: campground});
         }
    })
})

// =============  comment post =========
 
router.post('/', middleware.isLoggedIn ,(req,res)=>{
      Campground.findById(req.params.id,(err,camp)=>{
          if(err){
        console.log(err);
        res.redirect('/campgrounds');
      }
      else{
        Comment.create(req.body,(err,comment)=>{
            //add username and id to comment
        comment.author.id= req.user._id;
        comment.author.username = req.user.username;
            // save comment
            comment.save()
            console.log(comment);
           camp.comments.push(comment);
           camp.save((err,camp)=>{
               if(err) console.log(err);
               else  
                res.redirect('/campground/'+camp._id)
           })
        })
      }
   }) 
})

//edit comment route
router.get('/:comment_id/edit',middleware.checkCommentOwnership,(req,res)=>{
    Comment.findById(req.params.comment_id,(err,foundComment)=>{
        if(err) console.log(err)
        else{
            res.render('comment/edit',{
                camp_id: req.params.id,
                comment : foundComment
            });
        }
    })
     
})

router.put('/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body,(err,foundComment)=>{
        if(err) 
        res.redirect('back');
        else{
        res.redirect('/campground/'+req.params.id);
        }
    }) 
})

router.delete('/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndDelete(req.params.comment_id,(err,foundComment)=>{
        if(err) 
         res.redirect('back');
        else{
        res.redirect('/campground/'+req.params.id);
        }
    }) 
})


module.exports= router;