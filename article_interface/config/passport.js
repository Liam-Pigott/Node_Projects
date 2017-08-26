const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    //Local strategy
    passport.use(new localStrategy({
            usernameField: 'username', // redundant, could override
            passwordField: 'password', // same here
            passReqToCallback: true
        },function (req, username, password, done) {
        //Match username
        let query = {username: username};
        User.findOne(query, function(err, user){
            if(err){
                throw err;
            }
            if(!user){
                return done(null, false, req.session.messages = {
                    key: 'login',
                    type:'danger',
                    message: 'User not found...'
                });
            }
            //Match password
            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err){
                    throw err;
                }
                if(isMatch){
                    req.session.user = user;
                    return done(null, user);
                }
                else{
                    return done(null, false, req.session.messages = {
                        key: 'login',
                        type:'danger',
                        message: 'Username and password do not match...'
                    });
                }
            });
        });
    }));





    // passport.use(new localStrategy(function (username, password, done) {
    //     //Match username
    //     let query = {username: username};
    //     User.findOne(query, function(err, user){
    //         if(err){
    //             throw err;
    //         }
    //         if(!user){
    //             return done(null, false, req.session.messages = {
    //                 key: 'login',
    //                 type:'failure',
    //                 message: 'User not found...'
    //             });
    //         }
    //         //Match password
    //         bcrypt.compare(password, user.password, function(err, isMatch){
    //             if(err){
    //                 throw err;
    //             }
    //             if(isMatch){
    //                 return done(null, user);
    //             }
    //             else{
    //                 return done(null, false, req.session.messages = {
    //                     key: 'login',
    //                     type:'failure',
    //                     message: 'Username and password do not match...'
    //                 });
    //             }
    //         });
    //     });
    // }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
};