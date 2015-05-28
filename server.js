// BASE SETUP
// =============================================================================


// Call package

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// Configure bodyparser()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use('/api', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));


//var Player = require('./app/models/player');


// Set PORT

var port = process.env.PORT || 9000;


// API ROUTES
// =============================================================================

var router = express.Router();

// Prefixe route
app.use('/', router);

// Front/back Route prefixed with api

router.get('/', function(req, res){
   res.json({message: 'hey hey David, Welcome to your API player Manager'});
})


// middleware to use for all requests
router.use(function(req, res, next) {
   console.log('Something happening');
   next(); // make sure we go to the next routes and don't stop here
});




// START THE SERVER
// =============================================================================

app.listen(port);
console.log('connecté sur le port : ' + port);
