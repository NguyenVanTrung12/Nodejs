var conn = require('../database/connect');

const Sup = {
    getAll:(callback)=>{
        return conn.query("SELECT * FROM supplier",callback);
    },
    findById:(id,callback)=>{
        return conn.query(`SELECT * FROM supplier WHERE id = ${id}`,callback);
    },
    create:(data,callback)=>{
        return conn.query(`INSERT INTO supplier(name,email,address,phone_Number) VALUES('${data.name}','${data.email}','${data.address}','${data.phone_Number}')`,callback);
    },
    update:(data,callback)=>{
        return conn.query(`UPDATE supplier SET name='${data.name}',email='${data.email}',address='${data.address}',phone_Number='${data.phone_Number}' WHERE id=${data.id}`,callback);
    },
    delete:(id,callback)=>{
        return conn.query("delete from supplier WHERE id =" +id,callback);
    }
}
module.exports = Sup;