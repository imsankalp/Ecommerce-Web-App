const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');



// router.get('/testuser', async (req, res) => {
    
//     const user = new User({email: 'sankalp@gmail.com', username: 'sankalp'});
//     const newUser = await User.register(user, 'sankalp12'); 

//     res.send(newUser);
// })
//--------------------------------------------



//Get the register form
router.get('/register', async(req, res) => {

    res.render('auth/signup');
})


//Do the registration of User in the database.
router.post('/register', async(req, res) => {

    try{
        const user = new User({username: req.body.username, email: req.body.email });
        const newUser = await User.register(user, req.body.password);
        console.log(newUser);
        req.flash('success', 'Registered Successfully');
        res.redirect('/products');
    }
    catch(e) {

        req.flash('error', e.message);
        res.redirect('/register');
    }
})


//Get the login Form
router.get('/login', async(req, res) => {

    res.render('auth/login');
})

//Checking the login authenicity and redirecting to products.
router.post('/login', passport.authenticate('local',
            {   
                failureRedirect:'/login',
                failureFlash: true
            }
        ), (req, res) => {
            req.flash('success', `Welcome ${req.user.username}!`);
            res.redirect('/products');
        }
);


//Logout the user from current session
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', `Logged out succesfully! Visit again :)`);
    res.redirect('/login');
})


module.exports = router;