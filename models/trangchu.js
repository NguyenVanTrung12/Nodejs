var conn = require('../database/connect');

const Tc = {
    getAll:(callback)=>{
        return conn.query("SELECT * FROM product",callback);
    },
    findById:(status,callback)=>{
        return conn.query("SELECT * FROM product WHERE status = " + status,callback);
    },
    // create:(data,callback)=>{
    //     return conn.query(`INSERT INTO brand_sp(brand_name,status) VALUES('${data.brand_name}','${data.status}')`,callback);
    // },
    // update:(data,callback)=>{
    //     return conn.query(`UPDATE brand_sp SET brand_name='${data.brand_name}',status='${data.status}' WHERE id=${data.id}`,callback);
    // },
    // delete:(id,callback)=>{
    //     return conn.query("delete from brand_sp WHERE id =" +id,callback);
    // }
}
module.exports = Tc;