const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);

//mongoose connectivity
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/shopcart').then(db=>{
  console.log('MongoDb for shopcart is Connected');
}).catch(error=> console.log("could not connect"+ error));

require('./config/passport')

//bodyparser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//validator should be configure just after the body-parser as the validator on its own parse the body 
//and retrieve the parameter we want to validate from the submitted request

//validator config. 
app.use(validator());

//view engine setup
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({"defaultLayout":"layout"}));
app.set('view engine','handlebars');
app.locals.sTitle = 'Shopping Cart'; //to have something on all the routes

//session configuration
app.use(cookieParser());
//Earlier the session was stored on server(in memory)which was not an optimum way,so here we need to use
//'connect-mongo' package to store the session in our database
app.use(session({
  secret: 'mysupercart', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 180 * 60 * 1000}
}));

//configuring flash and passport and yes, ordering matters
app.use(flash());  //it should be initialize below session since it uses it.
app.use(passport.initialize());
app.use(passport.session());

//middleware for the navbar
app.use(function(req, res, next){
   res.locals.login = req.isAuthenticated();
   res.locals.session = req.session; //to access the session object in all the templates without the need to pass it explicitly in my routes.
   next();
});

//middleware
app.use(express.static(path.join(__dirname,'public')));

//route path for home page
let home = require('./routes/home');
app.use('/',home);

//route path for signup page
let signup = require('./routes/signup');
app.use('/signup',signup);

//route path for login page
let login = require('./routes/login');
app.use('/login',login);

//route path for profile page
let profile = require('./routes/profile');
app.use('/profile',profile); 

//route path for logout page
let logout = require('./routes/logout');
app.use('/logout',logout);




const port = 9000;
var server = app.listen(port,(req,res)=>{
  console.log(`listening to the ${port}`);
});