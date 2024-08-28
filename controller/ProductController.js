var Pro = require('../models/Pro');
const util = require('util');
const conn = require('../database/connect');
var ProductController = {
    index:(req,res)=>{
        Pro.getAll((err,data)=>{
            if(err){
                res.send(err);
            } else {
                res.render('Pro/DanhsachPro', { pro:data });
            }
        })
    },
    add:(req,res)=>{
        const query = util.promisify(conn.query).bind(conn);
        (async () => {
            try {
                const cate = await query('SELECT * from category_sp');
                const bran = await query('SELECT * from brand_sp');
                const sup = await query('SELECT * from supplier');
                res.render('Pro/AddPro',{cate:cate,brand:bran,sup:sup});
            } finally {

            }
        })()
        
    },

    create:(req,res)=>{
        try {
            const { name,brandId,price,sale,categoryId,description,color,size,supplierId,status } = req.body;
            const fileanh = req.file.filename;
            Pro.create(({ name,brandId,price,sale,categoryId,description,color,size,supplierId,status, fileanh }), (err, data) => {
                if (err)
                    res.send(err);
                else
                    res.redirect('/pro');

            });
        }
        catch (err) {
            console.error(err);
        }
        
    },
    edit:(req,res)=>{
        const query = util.promisify(conn.query).bind(conn);
        (async () => {
            try {
                const cate = await query('SELECT * from category_sp');
                const bran = await query('SELECT * from brand_sp');
                const sup = await query('SELECT * from supplier');
                Pro.findById(req.params.id,(err,data)=>{
                    if(err) {
                        res.send(err);
                    }else {
                        res.render('Pro/EditPro',{pro:data[0],cate:cate,brand:bran,sup:sup});
                    }
                })
            } finally {

            }
        })()

    },
    update:(req,res)=>{
        try {
            const { name,brandId,price,sale,categoryId,description,color,size,supplierId,status } = req.body;
            const fileanh = req.file.filename;
            Pro.update(({ name,brandId,price,sale,categoryId,description,color,size,supplierId,status, fileanh }), (err, data) => {
                if (err)
                    res.send(err);
                else
                    res.redirect('/pro');

            });
            
        }
        catch (err) {
            console.error(err);
        }
        
    },
    delete:(req,res)=>{
        Pro.delete(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.redirect('/pro');
            }
        })
    },
    Pro:requireLogin = (req, res, next) => {
        if (req.session.login) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}
module.exports = ProductController;