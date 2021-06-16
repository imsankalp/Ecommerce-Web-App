const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const {isUserLoggedIn} = require('../middleware');
const upload = require('../util/multer');
const cloudinary = require('../util/cloudinary');


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


//User Profile View
router.get('/user/:userId/profile',isUserLoggedIn, (req, res) => {
    //console.log(req.user);
    const currentUser = req.user;
    res.render('auth/user', {currentUser});
})

//Edit User Profile
router.get('/user/:userId/profile/edit',isUserLoggedIn, async(req, res) => {

    try{
        const currentUser = req.user;
        res.render('auth/editUser', {currentUser});
    }
    catch(e) {
        console.log(e.message);
        req.flash('error', 'Cannot Edit this Product');
        res.redirect('/error');
    }
})
//Update the user
router.patch('/user/:userId/profile',upload.single('image'), isUserLoggedIn, async(req, res) => {

    try{
        console.log(req.params.userId);
        if(typeof(req.file) == "undefined")
        {
            await User.findByIdAndUpdate(req.params.userId, {
                name: req.body.name,
                contactno: req.body.contactno,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
               
            }, function(err){
    
                if(err){
                    console.log(err);
                }
                else{
                    console.log(req.user);
                    req.flash('success', 'Updated Successfully!');
                    res.redirect(`/user/${req.params.userId}/profile`);
                }
            });
        }
        const uploadedImage = await cloudinary.uploader.upload(req.file.path);
        await User.findByIdAndUpdate(req.params.userId, {
            img: `${uploadedImage.secure_url}`,
            name: "Tanvi SIngh",
            contactno: req.body.contactno,
            gender: `${req.body.gender}`,
            dateOfBirth: `${req.body.dateOfBirth}`,
            cloudinary_id: `${uploadedImage.public_id}`,
        }, function(err){

            if(err){
                console.log(err);
            }
            else{
                console.log(req.user);
                req.flash('success', 'Updated Successfully!');
                res.redirect(`/user/${req.params.userId}/profile`);
            }
        });
        
    }
    catch(e) {
        console.log(e.message);
        req.flash('error', 'Cannot update this Product');
        res.redirect('/error');
    }
})



module.exports = router;