var express = require('express')
    ,bodyParser = require('body-parser')
    ,path = require('path')
    ,nunjucks = require('nunjucks')
    ,engines = require('consolidate');

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

var person = {
    name:'Jeff',
    age:30
};

var people = [
    {
        name:'Chloe',
        age:23
    },
    {
        name:'Liam',
        age:24
    },
    {
        name:'Simon',
        age:54
    }
];

//homepage represented by '/'
app.get('/', function(req,res){
    res.render('index.html',{
        title:'Nunjucks'
    });
});

app.listen(3000, function(){
    console.log('Server started on port 3000');
});


/*
    Running with nodemon from the command line means we don't have to restart the server from bash.
*/
