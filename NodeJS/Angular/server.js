var express = require("express"),
    app = express(),
    server = require('http').createServer(app),
    //We need this module to call the https api
    https = require('https'),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser');

//api_endpoint = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';
//API Information
var options = {
    host: 'https://vpic.nhtsa.dot.gov/',
    port: 443,
    path: '/api/vehicles/getallmakes?format=json',
    method: 'POST'
}

//Make sure that we can access the directory / from the front end
app.use('/', express.static(__dirname));

//Make sure that the app is using body parser for sending JSON objects back and forth
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//This function will sort using a callback
function sortcallback(arr, callback) {

}

//This function will asynchronous sort 
function sortreturn(arr) {

}

//This route will return all the items from the public api
app.get('/getAllItems', function(req, res) {
    https.request(options, function(response) {
        console.log(response);
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