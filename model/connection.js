const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'shivani123',
        database: 'loan_managment'
    }
}

const knex = require('knex')(options);

var insert_token=(data)=>{
    return knex("").insert(data)
};

var select = ()=>{
    return knex.select("*").from("auth_data")
}
module.exports={insert_token,select}

// knex.select('title', 'author', 'year').from('books')
