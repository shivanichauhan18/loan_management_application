var express = require('express');
var app = express();

var auth=require("./controller/auth")

app.use("/controller/auth",auth)






app.listen(5000, () => {
    console.log("server started on port 5000")
})