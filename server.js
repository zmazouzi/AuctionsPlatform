
var express = require('express');
var app = express();
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require("path");


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);


mongoose.connect("mongodb://localhost:27017/Users",function (err) {
    if (err){
        console.log(err);
    }
    else{
        console.log(" Successfully connected to the database ! ")  ;
    }
});

app.get("/",function (req,res) {
    res.sendFile(path.join(__dirname+'/public/views/index.html'));
});

app.listen(8080,function () {
    console.log("listening on port 8080");
})
