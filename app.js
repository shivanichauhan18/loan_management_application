var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = 3000;

var mongoose = require("mongoose");
mongoose.Promise = global.Promise; mongoose.connect("mongodb://localhost:27017/node-demo");

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastNameName: String
});

var User = mongoose.model("User", nameSchema);


app.get("/", (req, res) => {
    //  res.send("Hello World");
    res.sendFile(__dirname + "/index.html");

});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
