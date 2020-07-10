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
    return knex("auth_data").insert(data)
};

var user_data = (data)=>{
    return knex("user_details").insert(data)
}

let customerData = (customerDetails)=>{
    return knex("auth_data").insert(customerDetails)

}
// let customerlogin=(emailId)=>{
//     return knex.select('*').from('customer').havingIn('emailId',emailId)

// }

let varify_email = (email) =>{
    return knex.select('*').from('auth_data').havingIn('auth_data.email',email)
};


let varify_password = (password) => {
    return knex.select('password').from('auth_data').havingIn('auth_data.password',password)
}




var select = ()=>{
    return knex.select("*").from("auth_data")
}
module.exports={insert_token,select,user_data,varify_email,varify_password,customerData}

// knex.select('title', 'author', 'year').from('books')
