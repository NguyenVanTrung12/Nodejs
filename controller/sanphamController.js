var SP = require('../models/sanpham');
const util = require('util');
const conn = require('../database/connect');
var SpController = {
    index: (req, res) => {
        SP.getAll((err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.render('Giaodien/sanpham', { pro: data });
            }
        })
    },
    addd: (req, res) => {
        let _limit = 5;
        let _start = 0;
        const query = util.promisify(conn.query).bind(conn);
        (async () => {
            try {
                const pro = await query('SELECT * from product limit' + _start + _limit);
                
                const cat = await query('select * from category_sp');
                //const sup = await query('SELECT * from product where status =');
                //res.locals.title = 'San pham';
                res.render('Giaodien/sanpham',{pro:pro,cat:cat});
            } finally {

            }
        })()
    }

}
module.exports = SpController;