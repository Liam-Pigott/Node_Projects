const express = require('express'),
    path = require('path'),
    nunjucks = require('nunjucks'),
    engines = require('consolidate'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb',{
    useMongoClient: true
});
let db = mongoose.connection;

//check connection
db.once('open',function(){
    console.log('Connected to mongodb');
})

//check for DB errors
db.on('error',function(err){
    console.log(err)
});

//init app
const app = express();

//bring in models
let Article = require('./models/article');

//configure view engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

//view engine - add .njk extension to be used in templates with html files.
app.engine('njk', engines.nunjucks);
app.set('view engine', 'html');
app.set('views',path.join(__dirname,'views'));

// Body-parser middleware init
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//home route
app.get('/', function(req,res){
    Article.find({},function(err,articles){
        if(err){
            console.log(err)
        }
        else{
            res.render('index.html',{
                title:"Articles",
                articles:articles
            });
        }
    });
});

//add article route
app.get('/articles/add',function(req,res){
    res.render('add_article.njk',{
        title:"Add Article"
    })
});

//handle add article submit
app.post('/articles/add',function(req,res){
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.redirect('/');
        }
    });
});

//start server
app.listen(3000,function(){
    console.log('Server started on port 3000');
});