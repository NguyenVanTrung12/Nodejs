var conn = require('../database/connect');

const Ct = {
    // getById: (id, callback) => {
    //     const query = 'SELECT * FROM product WHERE id = ?';
    //     conn.query(query, [id], (error, results) => {
    //         if (error) {
    //             return callback(error, null);
    //         }
    //         if (results.length > 0) {
    //             callback(null, results[0]);
    //         } else {
    //             callback(new Error('Không tìm thấy sản phẩm'), null);
    //         }
    //     });
    // }
    findById:(id,callback)=>{
        return conn.query(`SELECT * FROM product WHERE id = ${id}`,callback);
    },
    
}
module.exports = Ct;