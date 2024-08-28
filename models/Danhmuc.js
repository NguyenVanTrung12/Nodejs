var conn = require('../database/connect');

const Danhmuc = {
    getAll:(callback)=>{
        return conn.query("SELECT * FROM product",callback);
    },
    // findById:(categoryId,callback)=>{
    //     return conn.query(`SELECT * FROM product WHERE categoryId = ${categoryId}`,callback);
    // },
    findById:(categoryId,callback)=>{
        return conn.query("select from product WHERE categoryId =" +categoryId,callback);
    },
    // create:(data,callback)=>{
    //     return conn.query(`INSERT INTO product(name,brandId,price,sale,categoryId,description,img,color,size,supplierId,status) VALUES('${data.name}','${data.brandId}','${data.price}','${data.sale}','${data.categoryId}','${data.description}','${data.fileanh}','${data.color}','${data.size}','${data.supplierId}','${data.status}')`,callback);
    // },
    // update:(data,callback)=>{
    //     return conn.query(`UPDATE product SET name='${data.name}',brandId='${data.brandId}',price='${data.price}',sale='${data.sale}',categoryId='${data.categoryId}',description='${data.description}',img='${data.fileanh}',color='${data.color}',size='${data.size}',supplierId='${data.supplierId}',status='${data.status}' WHERE id='${data.id}'`,callback);
    // },
    // delete:(id,callback)=>{
    //     return conn.query("delete from product WHERE id =" +id,callback);
    // }
}
module.exports = Danhmuc;