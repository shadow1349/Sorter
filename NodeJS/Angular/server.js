var express = require("express"),
    app = express(),
    server = require('http').createServer(app),
    //We need this module to call the https api
    node_rest = require('node-rest-client').Client,
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
    client = new node_rest();

//api_endpoint = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';
//API Information
var options = {
    host: 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json',
    path: '/api/vehicles/getallmakes?format=json',
    method: 'GET'
}

//Make sure that we can access the directory / from the front end
app.use('/', express.static(__dirname));

//Make sure that the app is using body parser for sending JSON objects back and forth
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//This route will return all the items from the public api
app.get('/getAllItems', function(req, res) {
    client.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json',function(data, response) {
        //At this point we have an unordered list of cars
        console.log(data);
        res.json(data);
        
    });
});


//App Will Start To Server index.html
app.use(function(req,res){
    res.sendFile(__dirname + '/index.html');
});


//Start the server on the specified port
server.listen(port, function() {
    console.log('Angular Sorter Server Started On ' + port);
});