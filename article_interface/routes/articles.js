const express = require('express'),
    router = express.Router();

//bring in models
let Article = require('../models/article');
let User = require('../models/user');

//add article route
router.get('/add', ensureAuthenticated,function(req,res){
    res.render('add_article.njk',{
        title:"Add Article"
    })
});

//handle add article submit
router.post('/add',function(req,res){
    req.checkBody('title','Title is required!').notEmpty();
    // req.checkBody('author','Author is required!').notEmpty();
    req.checkBody('body','Body is required!').notEmpty();

    //get errors
    let errors = req.validationErrors();

    if(errors){
        res.render('add_article.njk',{
            title:'Add Article',
            errors:errors
        });
    }
    else{
        let article = new Article();
        article.title = req.body.title;
        article.author = res.locals.user._id;
        article.body = req.body.body;
    
        article.save(function(err){
            if(err){
                console.log(err);
                return;
            }
            else{
                req.session.messages = {
                    key: 'status',
                    type:'success',
                    message: 'Article created successfully!'
                };
                res.redirect('/');
            }
        });
    }
});

//load edit form
router.get('/edit/:id', ensureAuthenticated, function(req,res){
    Article.findById(req.params.id, function(err,article){
        if(article.author != req.user._id){
            req.session.messages = {
                key: 'status',
                type:'danger',
                message: 'Not Authorized!'
            }
            res.redirect('/');
        }
        else{
            res.render('edit_article.njk',{
                title:'Edit Article',
                article:article
            });
        }
    });
});

//handle edit article and update db
router.post('/edit/:id',function(req,res){
    //no need to create a new Article object like in add page
    let article = {}
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id};

    Article.update(query,article,function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            req.session.messages = {
                key: 'status',
                type:'success',
                message: 'Article updated successfully!'
            }
            res.redirect('/');
        }
    });
});

//get single article - ':' is a placeholder
router.get('/:id', function(req,res){
    Article.findById(req.params.id, function(err, article){
        User.findById(article.author, function(err, user) {
            res.render('article.njk',{
                article: article,
                user: res.locals.user
            });
        });
    });
});

//fired by the ajax request in main.js - using ajax is more secure than GET then delete
router.delete('/:id',function(req,res){
    if(!req.user._id){
        res.status(500).send();
    }
    let query = {_id:req.params.id};

    Article.findById(req.params.id, function(err, article) {
        if(article.author != req.user._id){
            res.status(500).send();
        }
        else{
            //delete from Article mongoose schema
            Article.remove(query,function(err){
                if(err){
                    console.log(err);
                }
                req.session.messages = {
                    key: 'status',
                    type:'danger',
                    message: 'Article deleted!'
                }
                //sends 200 by default
                res.send('Success');
            });
        }
    });
});

//Access control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.session.messages = {
            key: 'status',
            type:'danger',
            message: 'Please login!'
        };
        res.redirect('/users/login');
    }
}

module.exports = router;