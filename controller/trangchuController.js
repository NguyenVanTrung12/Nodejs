
var TC = require('../models/trangchu');
const util = require('util');
const conn = require('../database/connect');
var TcController = {
    index: (req, res) => {
        TC.getAll((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.render('Giaodien/trangchu', { pro: data });
            }
        })
    },
    add: (req, res) => {
        TC.findById(req.params.status = 1, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.render('Giaodien/trangchu', { pro: data });
            }
        })
    },
    addd: (req, res) => {

        const query = util.promisify(conn.query).bind(conn);
        (async () => {
            try {
                const cate = await query('SELECT * from product where sale > 0'   );
                const bran = await query('SELECT * from product where status = 1');
                const cat = await query('select * from category_sp');
                //const sup = await query('SELECT * from product where status =');
                res.render('Giaodien/trangchu',{cate:cate,brand:bran,cat:cat});
            } finally {

            }
        })()
    }
    // add: (req, res) => {
    //     TC.findById(req.params.status === 1 ? 1 : 2, (err, data) => {
    //       if (err) {
    //         res.send(err);
    //       } else {
    //         let proData = data;
    //         // Kiểm tra status để quyết định dữ liệu truyền vào template
    //         if (req.params.status === 1) {
    //           // Nếu status = 1, chỉ lấy các sản phẩm giảm giá
    //           proData = proData.filter(product => product.discount > 0);
    //         } else if (req.params.status === 2) {
    //           // Nếu status = 2, chỉ lấy các sản phẩm bán chạy (sắp xếp theo số lượng bán)
    //           proData = proData.sort((a, b) => b.soldQuantity - a.soldQuantity);
    //         }
    //         res.render('Giaodien/trangchu', { pro: proData });
    //       }
    //     });
    //   }
}
module.exports = TcController;