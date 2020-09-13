var express  = require('express');
var router = express.Router();
var Campground = require('../models/campground');
const passport = require('passport');
var middleware = require('../middleware/index.js');


router.get('/',(req,res)=>{
    Campground.find({},(err,allCampground)=>{
        if(err)
         console.log(err);
         else{
              res.render("campground",{
                  campground : allCampground 
              })
         }
    })
}) 

router.post('/',middleware.isLoggedIn,(req,res)=>{
    
   var {name,image, description} =req.body;
   var author = {
        id: req.user._id,
        username : req.user.username
      }
  var newCamp={name:name, image:image, description: description,author: author};

   Campground.create(newCamp,(err,campground)=>{
       if(err)
       console.log(err);
       else{
           console.log("New Yelpcamp is added!")
           console.log(campground);
       }
   })
   res.redirect('/campground');
      console.log('You hit the post route');
}) 

router.get('/new',middleware.isLoggedIn,(req,res)=>{
   res.render('campground/new');
})

router.get('/:id',(req,res)=>{
   Campground.findById(req.params.id).populate('comments').exec((err,campground)=>{
       if(err)  console.log(err)
       else{
           console.log(campground);
             res.render("campground/show",{campground:  campground});
       }
   })
})

//edit campground route
router.get('/:id/edit',middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findById(req.params.id,(err,camp)=>{
        if(err){
            console.log(err);
            res.redirect('/campground');
        } 
        else{
            res.render('campground/edit',{campground: camp});
        }
    })
    
})

router.put('/:id',middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndUpdate(req.params.id,req.body,(err,camp)=>{
        if(err){
            console.log(err);
            res.redirect('/campground');
        } 
        else{
            res.redirect('/campground/'+req.params.id);
        }
    })
})
//delete campground
router.delete('/:id',middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findByIdAndRemove(req.params.id,(err,camp)=>{
        if(err){
            console.log(err);
            res.redirect('/campground');
        } 
        else{
            res.redirect('/campground');
        }
    })
}) 

module.exports= router;


