const express= require('express');
const app= express();
const expressLayouts=require('express-ejs-layouts')
const mongoose=require('mongoose');
var methodOverride = require('method-override');

var passport       = require('passport'),
    localStrategy  = require('passport-local'),
    localStrategyMongoose = require('passport-local-mongoose'),
    session          = require('express-session');  

// export from database
const Campground=require('./models/campground.js');
const  seedDB    = require('./seeds.js');
var    Comment     = require('./models/comment.js');
var    User        = require('./models/user.js');

// Routes
var indexRoutes = require('./routes/index');
var campgroundRoutes = require('./routes/campground');
var commentRoutes = require('./routes/comment');

//    seedDB();

// passport configuration
app.use(session({
    secret: 'my name is ashu',
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//connect with db
 mongoose.connect('mongodb+srv://ashukumar:Rahul@123@cluster0.nznqo.mongodb.net/<dbname>?retryWrites=true&w=majority',{ 
    useNewUrlParser: 'true',
    useCreateIndex: true,
    useUnifiedTopology : true
 })
 .then(()=>console.log("Mongodb is conneted!"))
 .catch(err=> console.log(err));


//ejs 
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));


//body parser
app.use(express.urlencoded({extended : true}));

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})

// console.log(currentUser);
app.use(indexRoutes);
app.use('/campground',campgroundRoutes);
app.use('/campground/:id/comments',commentRoutes);


app.listen(process.env.PORT || 3000,()=>{
    console.log("The YelpCamp server has started");
});








