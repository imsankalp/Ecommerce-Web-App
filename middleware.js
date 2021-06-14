
const isUserLoggedIn = (req, res, next) =>{

    if (!req.isAuthenticated()) {
        req.flash('error', 'You need to log in first!');
        return res.redirect('/login');  
    }
    next();
}

module.exports = {
    isUserLoggedIn
}