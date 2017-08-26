const express = require('express'),
    path = require('path'),
    nunjucks = require('nunjucks'),
    engines = require('consolidate'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    expressValidator = require('express-validator'),
    flash = require('express-flash'),
    cookieParser = require('cookie-parser'),
    config = require('./config/database')
    passport = require('passport');

mongoose.connect(config.database, {
    useMongoClient: true
});
let db = mongoose.connection;

//check connection
db.once('open', function () {
    console.log('Connected to mongodb');
});

//check for DB errors
db.on('error', function (err) {
    console.log(err);
});

//init app
const app = express();

//bring in models
let Article = require('./models/article');

//configure view engine
nunjucks.configure('views', {
    autoescape: true,
    noCache: true,
    express: app,
    watch: true
});

//view engine - add .njk extension to be used in templates with html files.
app.engine('njk', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Body-parser middleware init
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Express session middleware
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));

app.use(flash());

app.use('*', function (req, res, next) {
    res.locals.user = req.session.user || null;
    res.locals.messages = req.session.messages;
    delete req.session.messages;
    next();
});

//Express validator middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
}));

//Passport config
require('./config/passport')(passport);
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//home route
app.get('/', function(req,res){
    Article.find({},function(err,articles){
        if(err){
            console.log(err)
        }
        else{
            res.render('index.html',{
                title:"Articles",
                articles:articles,
                message:res.locals.messages
            });
        }
    });
});

//Route files
let articles = require('./routes/articles.js');
let users = require('./routes/users.js');

//anything that navs to /articles, go through routes in articles file
app.use('/articles', articles);
app.use('/users', users);

//applies to all routes
// app.get('*', function(req, res, next) {
//     res.locals.user = req.user || null;
//     //call next piece of middleware
//     next();
// });

//start server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});

module.exports = app;