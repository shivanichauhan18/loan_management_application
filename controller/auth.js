const knex1 = require("../model/connection")
var passwordHash = require('password-hash');


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

// api publish key === pub-c-c3425c31-6692-497f-a969-8a965161b6d7
// subscribe key == sub-c-8893ebe6-c032-11ea-a44f-6e05387a1df4

app.get('/loan_intro', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/user_details.html'));
});

app.get('/user_loan_intro', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/user_loan_details.html'));
});


app.get('/20_lac_loan', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/20_lac_loan_page.html'));
});


app.get('/10_lac_loan', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/10_Lac_loan_page.html'));
});


app.get('/5_lac_loan', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/5_lac_loan_page.html'));
});


app.get('/2_lac_loan', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/2_lac_loan_page.html'));
});


app.get('/user_loan_submition', function (req, res) {
    res.sendFile(path.join(__dirname + '/view/user_loan_submition.html'));
});



app.post('/sign_up', (req, res, next) => {

    let customerDetails={
        "name": req.body.fullname,
        "email": req.body.email,
        "password": req.body.psw,
        "repead_pwd": req.body.psw_repeat,
        "user_reference_id":7896
    }
    let response = knex1.customerData(customerDetails)
    response.then((data)=>{
        res.redirect('/loan_intro')
    }).catch((err)=>{
        console.log(err)
        res.send({"staus":"wrong entry","massage":"your email is already exists pleas use another"})
    })
});


app.post("/login", (req, res, next) => {
    let email_id = req.body.email;
    let password = req.body.psw;
    let response=knex1.varify_email(email_id)
    response.then((data)=>{
        if(data.length==0){
            res.send("your email is incorect please try again...")
        }
        else if(data[0]["password"]==password){
            let token = jwt.sign({"user":data[0]},"secret_key")
            // res.cookie(token)
            jwt.verify(token,"secret_key",(err,result)=>{
                res.json({"status":"write","massage":"login successful ","token":result})
            })   
        }
        else{
            res.send("your password is incorect try again....")
        }
    }).catch((err)=>{
        res.send(err)
    })



    
    // knex1.varify_email(email)
    //     .then((result) => {
    //         if (result.length != 0) {
    //             var hashedPassword = result[0]['password'];
    //             var varify_password = passwordHash.verify(password, hashedPassword);
    //             console.log(varify_password)

    //             if (varify_password == true) {
    //                 var token = jwt.sign({ "token": result[0].role_id }, 'mishra');
    //                 res.cookie("success")
    //                 res.send('login...success')
    //             }
    //             else {
    //                 res.send('wrong password')
    //                 console.log('wrong password');
    //             }

    //         }

            // else {
        //         res.send('wrong email')
        //         console.log("wrong email")
        //     }
        // })
        // .catch((err) => {
        //     res.send(err)
        //     console.log(err)
        // })

    // })
})

///Token verification function.

function verifyToken(req, res, next) {
    var hashedPassword = passwordHash.generate(req.body.psw)
    var repead_pwd = passwordHash.generate(req.body.psw_repeat)

    const bearerHeader = {
        "sub": "0984999321",
        "name": req.body.fullname,
        "email_NAME": req.body.email,
        "pwd": hashedPassword,
        "repead_pwd": repead_pwd,
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
        "mobile_no":req.body.number,
        "stages":req.body.user_stage,
        "date_of_creation":new Date()
    }
    var user_res=knex1.user_data(user_data)
    user_res.then((data)=>{
        if(user_data.loan_price == "20 Lac"){
            res.redirect('/20_lac_loan')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
        }else if(user_data.loan_price == "10 Lac"){
            res.redirect('/10_lac_loan')
        }else if(user_data.loan_price == "5 Lac"){
            res.redirect('/5_lac_loan')
        }else if(user_data.loan_price == "2 Lac"){
            res.redirect('/2_lac_loan') 
        }else{
            res.send("your loan out of validity")
        }
    }).catch((err)=>{
        res.send(err)
    })
})

app.post("/loan_type_check",(req,res)=>{
    var data = req.body.browser
    if (data == "Home"){
        res.redirect("/user_loan_intro")
    }else if(data == "Vahicle"){
        res.send("vahicle loan")
    }else{
        res.send("business loan")
    }
})

app.post("/higher_loan_details",(req,res)=>{
    res.redirect('/user_loan_submition')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  
})



app.listen(5000, () => {
    console.log("server started on port 5000")
})