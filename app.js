const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const seedDB = require('./seed');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const Order = require('./models/order');
const cors = require('cors');
const crypto = require('crypto');
const Razorpay = require('razorpay');


//Routes
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');


mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
.then(() => {
    console.log("DB connected!");
})
.catch(err => {
    console.log("Connection Failed");
    console.log(err);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cors());


const sessionConfig = {
    secret:"weneedsomebettersecret",
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionConfig));
app.use(flash());

//Authentication: Initializing the passport & sessions for strong the users info
app.use(passport.initialize()); 
app.use(passport.session());

//Configuring the passport to use Local Strategy
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})



// seedDB();

app.get('/', (req, res) => {

    res.render('home');
})


app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(paymentRoutes);


app.listen(process.env.PORT || 3000, () => {

    console.log("Server running at port no 3000");
})




