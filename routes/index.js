var express = require('express');
var router  = express.Router();
var passport= require('passport');
var    User = require('../models/user.js');


router.get('/',(req,res)=>{
    res.render('landing');
})

//  Auth Routes
router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',(req,res)=>{
    var newUser= new User({username : req.body.username})
    User.register(newUser , req.body.password, (err,user)=>{
        if(err) {
            console.log(err);
            // req.alert(err);
            return res.render('register');
        }
        passport.authenticate('local')(req,res,()=>{
            res.redirect('/campground');
        })
    })
})

// login handle
router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',passport.authenticate('local',{
    successRedirect: '/campground',
    failureRedirect: 'login',
    // failureFlash : false
}),(req,res)=>{});


//logout handle
router.get('/logout',(req,res)=>{
   req.logOut();
   res.redirect('/')
})

//  protect 
function isLoggedin(req,res,next){
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports= router ;


