var express = require('express')
    ,bodyParser = require('body-parser')
    ,path = require('path')
    ,nunjucks = require('nunjucks')
    ,engines = require('consolidate')
    ,expressValidator = require('express-validator')
    ,mongoJS = require('mongojs');

var db = mongoJS('customerapp', ['users']);

var app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

//view engine - add .njk extension to be used in templates with html files.
app.engine('njk', engines.nunjucks);
app.set('view engine', 'html');
app.set('views',path.join(__dirname,'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//middleware to put static files - setting static path
app.use(express.static(path.join(__dirname,'public')));


//Global vars - use res.locals.whatever
app.use(function(req,res,next){
    res.locals.errors = null;
    next();
});


// express validator - setting up error formatter
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

var person = {
    name:'Jeff',
    age:30
};

var users = [
    {
        id: 1,
        first_name: 'Chloe',
        last_name: 'Simpson',
        email: 'cs@gmail.com',
        age: 23
    },
    {
        id: 2,
        first_name:'Liam',
        last_name: 'Pigott',
        email: 'lp@gmail.com',
        age:24
    },
    {
        id: 3,
        first_name:'Simon',
        last_name: 'Nelson',
        email: 'sn@gmail.com',
        age:54
    }
];


//homepage represented by '/'
app.get('/', function(req,res){
    res.render('index.html',{
        title: 'Nunjucks',
        users: users
    });
});

app.post('/users/add', function(req,res){

    req.checkBody('first_name','First Name is Required').notEmpty();
    req.checkBody('last_name','Last Name is Required').notEmpty();
    req.checkBody('email','Email is Required').notEmpty();

    var errors = req.getValidationResult().then(function(result){
        if(!result.isEmpty()){
            res.render('index.html',{
                title: 'Nunjucks',
                users: users,
                errors: result.array()
            });
        }
        else{
            var newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            }
            console.log('SUCCESS');
        }
    });
});

app.listen(3000, function(){
    console.log('Server started on port 3000');
});

/*
    Running with nodemon from the command line means we don't have to restart the server from bash.
*/
