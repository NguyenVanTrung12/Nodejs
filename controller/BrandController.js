var Brand = require('../models/Brand');

var BrandController = {
    index:(req,res)=>{
        Brand.getAll((err,data)=>{
            if(err){
                res.send(err);
            } else {
                res.render('Brand/DanhsachBrand', { bran:data });
            }
        })
    },
    add:(req,res)=>{
        res.render('Brand/Addbrand');
    },

    create:(req,res)=>{
        Brand.create(req.body,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.redirect('/brand');
            }
        })
    },
    edit:(req,res)=>{
        Brand.findById(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.render('Brand/EditBrand',{cate:data[0]});
            }
        })
    },
    update:(req,res)=>{
        Brand.update(req.body,(err,data)=>{
            if(err) {
                res.send(err);

            } else {
                res.redirect('/brand');
            }
        })
    },
    delete:(req,res)=>{
        Brand.delete(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.redirect('/brand');
            }
        })
    },
}
module.exports = BrandController;