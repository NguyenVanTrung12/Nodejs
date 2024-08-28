var conn = require('../database/connect');

const customer = {
    getAll:(callback)=>{
        return conn.query("SELECT * FROM customer",callback);
    },
    findById:(id,callback)=>{
        return conn.query(`SELECT * FROM customer WHERE id = ${id}`,callback);
    },
    create:(data,callback)=>{
        return conn.query(`INSERT INTO customer(name,email,password) VALUES('${data.name}','${data.email}','${data.password}')`,callback);
    },
    update:(data,callback)=>{
        return conn.query(`UPDATE customer SET name='${data.name}',status='${data.email}' WHERE id=${data.id}`,callback);
    },
    delete:(id,callback)=>{
        return conn.query("delete from customer WHERE id =" +id,callback);
    },
    check_login:(email,password,callback)=>{
        conn.query(`SELECT * FROM customer WHERE email = '${email}' AND password = '${password}'`,(err,data)=>{
            if(data[0]) {
                return callback(null,data[0]);
            } else {
                let err = "Sai thông tin";
                return callback(err,null);
            }
        });
    }
}
module.exports = customer;