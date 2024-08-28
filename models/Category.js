var conn = require('../database/connect');

const Category = {
    getAll:(callback)=>{
        return conn.query("SELECT * FROM category_sp",callback);
    },
    findById:(id,callback)=>{
        return conn.query(`SELECT * FROM category_sp WHERE id = ${id}`,callback);
    },
    create:(data,callback)=>{
        return conn.query(`INSERT INTO category_sp(category_name,status) VALUES('${data.category_name}','${data.status}')`,callback);
    },
    update:(data,callback)=>{
        return conn.query(`UPDATE category_sp SET category_name='${data.category_name}',status='${data.status}' WHERE id=${data.id}`,callback);
    },
    delete:(id,callback)=>{
        return conn.query("delete from category_sp WHERE id =" +id,callback);
    }
}
module.exports = Category;