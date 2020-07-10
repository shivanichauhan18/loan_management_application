
knex.schema.hasTable("Product_table").then((exists)=>{
    if (!exists){
        return knex.schema.createTable("Product_table",(table)=>{
            table.increments ('auction_id'),
            table.string('auction_name'),
            table.integer('auction_price')
        })
    .catch((err)=>{
        console.log(err)
        })
    }
    // return console.log("table has created")
})

// jwt.verify((req.token), "SECRET_KEY", { algorithms: ['RS256'] }, (err, authData) => {
    //     if (err, authData) {
    //         console.log(err)
    //         res.sendStatus(403);
    //     } else {
    //         var token_data = {}
    //         token_data["token"] = req.token
    //         var response = knex1.insert_token(token_data)
    //         response.then((data) => {
    //             res.json({
    //                 message: "Your sign up sucessfully complete"
    //             });
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    //     }
    
    // })