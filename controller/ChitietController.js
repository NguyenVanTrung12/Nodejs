
var Ct = require('../models/chitet');
const util = require('util');
const conn = require('../database/connect');

var CtController = {
    // getProductDetail: (req, res) => {
    //     const productId = req.params.id;
        
    //     Ct.getById(productId, (error, product) => {
    //         if (error) {
    //             return res.status(500).send('Lỗi khi lấy sản phẩm từ cơ sở dữ liệu');
    //         }

    //         // Render trang chi tiết sản phẩm
    //         res.render('Giaodien/Chitiet', { pro: product });
    //     });
    // }
    edit:(req,res)=>{
        Ct.findById(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.render('Giaodien/chitiet',{Ct:data});
            }
        })
    },
    addd: (req, res) => {

        const query = util.promisify(conn.query).bind(conn);
        (async () => {
            try {
                const pro = await query('SELECT * from product ');
                
                const cat = await query('select * from category_sp');
                //const sup = await query('SELECT * from product where status =');
                Ct.findById(req.params.id,(err,data)=>{
                    if(err) {
                        res.send(err);
                    }else {
                        res.render('Giaodien/chitiet',{Ct:data,pro:pro,cat:cat});
                    }
                })
            } finally {

            }
        })()
    }
}
module.exports = CtController;