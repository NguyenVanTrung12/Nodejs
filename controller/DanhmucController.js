var Danhmuc = require('../models/Danhmuc');
var catt = require('../models/Category');
const util = require('util');
const conn = require('../database/connect');
var DanhmucController = {
   
    add:(req,res)=>{
        const query = util.promisify(conn.query).bind(conn);
        (async () => {
            try {
                const cate = await query('SELECT * from product where categoryId =' + req.params.id);
                const cat = await query('select * from category_sp');
                res.render('Giaodien/danhmuc',{cate:cate,cat:cat});
            } finally {

            }
        })()
        
    },

    
}
module.exports = DanhmucController;