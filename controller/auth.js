const knex1 = require("../model/connection")

const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
let jwt = require('jsonwebtoken');
var app = express();
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
                    message: "post created....",
                    data: data
                });
            }).catch((err) => {
                console.log(err)
            })
        }
        //    console.log(token_data)

        //    res.send(user_name)
    })
});


app.post("/login", (req, res, next) => {
    // const user_token = knex1.select()
    // user_token.then((data)=>{
    //     const str_token = data[1].token
    //     console.log(str_token)


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
                    token: "your email not exists" 
                })     
               }
            })

        // }).catch((err)=>{
        // console.log(err)
        // })

    })
})

// res.json({
//     message:"your login data",
//     data : data
// });


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
        // const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();

    } else {
        res.sendStatus(403);
    }
}



app.listen(5000, () => {
    console.log("server started on port 5000")
})