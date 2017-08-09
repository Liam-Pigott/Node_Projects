var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//Middleware - pretty much full control over what is ran here
/*
var logger = function(req,res,next){
    console.log('Logging...')
    next();
}

app.use(logger);
*/

//view engine
app.set('view engine','ejs');
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
//    res.send('Hello');
//    res.json(person);
//    res.json(people);
    res.render('index',{
        title:'Customers'
    });
});

app.listen(3000, function(){
    console.log('Server started on port 3000');
});



/*
    Running with nodemon from the command line means we don't have to restart the server from bash.
*/
