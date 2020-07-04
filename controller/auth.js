const knex1 = require("../model/connection")

const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
let jwt = require('jsonwebtoken');
var app = express();
// var app=express.Router()
// app.use(express.json());


var nJwt_data = require('njwt');


app.use(bodyParser.urlencoded({ extended: false }));


app.get('/loan_app', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/intro_page.html'));
});

app.get('/signup_page', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/sign_up.html'));
});

app.get('/login_page', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/login_page.html'));
});

app.get('/loan_intro', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/user_details.html'));
});

app.get('/user_loan_intro', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/user_loan_details.html'));
});


app.get('/20_lac_loan', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/20_lac_loan_page.html'));
});


app.get('/user_loan_submition', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/user_loan_submition.html'));
});



app.post('/sign_up', verifyToken, (req, res, next) => {
    jwt.verify((req.token), "SECRET_KEY", { algorithms: ['RS256'] }, (err, authData) => {
        if (err, authData) {
            console.log(err)
            res.sendStatus(403);
        } else {
            var token_data = {}
            token_data["token"] = req.token
            var response = knex1.insert_token(token_data)
            response.then((data) => {
                res.json({
                    message: "Your sign up sucessfully complete"
                });
            }).catch((err) => {
                console.log(err)
            })
        }
      
    })
});


app.post("/login", (req, res, next) => {
    const user = {
        "name": req.body.fullname,
        "emails": req.body.email,
        "pwd": req.body.psw,
        "repead_pwd": req.body.psw_repeat,
    }

    jwt.sign(user, "SECRET_KEY", (err, tokens) => {
        const user_token = knex1.select()
        user_token.then((data) => {
            const str_token = data[1].token
            if (str_token == tokens) {
                res.json({
                    token: "you logged in " 
                })         
               }else{
                res.json({
                    token: "your email not exists" + tokens
                })     
               }
            })

    })
})

///Token verification function.

function verifyToken(req, res, next) {
    const bearerHeader = {
        "sub": "0984999321",
        "name": req.body.fullname,
        "email_NAME": req.body.email,
        "pwd": req.body.psw,
        "repead_pwd": req.body.psw_repeat,
        "jti": "a0f65b60-19ec-42aa-b3fd-01f8f50560af",
        "iat": 1573281829,
        "exp": 1573285429
    }
    var jwt_web = nJwt_data.create(bearerHeader, "secret", "HS256");
    var bearerToken = jwt_web.compact();

    if (typeof jwt_web !== 'undefined') {
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


app.post("/user_details",(req,res)=>{
    var user_data = {
        "name":req.body.Name,
        "surName":req.body.surName,
        "fatherName":req.body.Father_Name,
        "service":req.body.service_detail,
        "your_intension":req.body.yes_not,
        "loan_price":req.body.browser,
        "mobile_no":req.body.number
    }
    var user_res=knex1.user_data(user_data)
    user_res.then((data)=>{
        
        res.redirect('/20_lac_loan')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    }).catch((err)=>{
        res.send(err)
    })
})

app.post("/add_loan_data",(req,res)=>{
    res.redirect('/user_loan_submition')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  
})


app.listen(5000, () => {
    console.log("server started on port 5000")
})