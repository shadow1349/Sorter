var express = require("express"),
    app = express(),
    server = require('http').createServer(app),
    //We need this module to call the https api
    node_rest = require('node-rest-client').Client,
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
    client = new node_rest()
    session = require('express-session');

//Same function as the index controller
//I created this one so that I can re-use the filter
Array.prototype.Search = function(query) {
    return this.filter(function(car) {
        return car.Make_Name.toLowerCase().includes(query.toLowerCase());
    });
}

//api_endpoint = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';
//API Information
var options = {
    host: 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json',
    path: '/api/vehicles/getallmakes?format=json',
    method: 'GET'
}

//This will help me store variables in a session
app.use(
    session({
        secret: 'nodesorter',
        resave: true,
        saveUninitialized: true,
        cookie: {}
    })
);

//Make sure that we can access the directory / from the front end
app.use('/', express.static(__dirname));

//Make sure that the app is using body parser for sending JSON objects back and forth
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//This route will return all the items from the public api
app.get('/getAllItems', function(req, res) {
    client.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json',function(data, response) {
        //At this point we have an unordered list of cars
        //I am saving the list of cars in the current session
        req.session.cars = data.Results;
        //This will return the data to the user
        //Return only the Results to limit the amount of data you are sending from the server to the front end
        res.json(data.Results);
    });
});


app.post('/search', function(req, res) {
    //I used a try catch here to make sure that if the session gets destroyed we can re-pull the data and save it in the session
    try
    {   
        //We will try to return the search results
        res.json(req.session.cars.Search(req.body.query));
    }
    catch(e) {
        //If there is an error I can just re-pull the data and save it in the session
        client.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json',function(data, response) {
            //Save the cars on the session
            req.session.cars = data.Results;
            //Return the filtered data
            res.json(data.Results.Search(req.body.query));
        });
    }
});

function CleanData(arr, callback) {
    arr.forEach(function(car, idx) {
        arr[i] = car.trim();
    });
    callback(arr);
}


//App Will Start To Server index.html
app.use(function(req,res){
    res.sendFile(__dirname + '/index.html');
});


//Start the server on the specified port
server.listen(port, function() {
    console.log('Angular Sorter Server Started On ' + port);
});