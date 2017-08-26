const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

//bring in models
let User = require('../models/user');

//register form route
router.get('/register', function (req, res) {
    res.render('register.njk');
});

//Registration process
router.post('/register', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username= req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    req.getValidationResult().then( function (result) {
        if(!result.isEmpty()){
            //there are errors, log em
            console.log(result);
            res.render('register.njk', {
                errors:result
            });
        }
        else{
            let newUser = new User({
                name: name,
                email: email,
                username: username,
                password: password
            });

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash){
                    if(err){
                        console.log(err);
                    }
                    newUser.password = hash;
                    newUser.save(function (err) {
                        if(err){
                            console.log(err);
                        }
                        else{
                            req.session.messages = {
                                key: 'register',
                                type:'success',
                                message: 'Your account has been registered!'
                            };
                            res.redirect('/users/login');
                        }
                    });
                });
            });
        }
    });
});

//login form
router.get('/login', function(req, res){
    res.render('login.njk', {
        message:res.locals.messages
    });
});

//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/',
        failureRedirect:'/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout
router.get('/logout', function(req, res) {
    req.logout();
    req.session.messages = {
        key: 'logout',
        type:'success',
        message: 'You have successfully logged out!'
    };
    req.session.user = null;
    res.redirect('/users/login');
});

module.exports = router;