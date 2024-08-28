var conn = require('../database/connect');
const bcrypt = require('bcrypt');
const Admin = {
    getAll:(callback)=>{
        return conn.query("SELECT * FROM users",callback);
    },
    findById:(id,callback)=>{
        return conn.query(`SELECT * FROM users WHERE id = ${id}`,callback);
    },
    create:(data,callback)=>{
        return conn.query(`INSERT INTO users(name,email,password) VALUES('${data.name}','${data.email}','${data.password}')`,callback);
    },
    update:(data,callback)=>{
        return conn.query(`UPDATE users SET name='${data.name}',email='${data.email}',password='${data.password}' WHERE id=${data.id}`,callback);
    },
    delete:(id,callback)=>{
        return conn.query("delete from users WHERE id =" +id,callback);
    }
}
module.exports = Admin;