var Category = require('../models/Category');

var CategoryController = {
    index:(req,res)=>{
        Category.getAll((err,data)=>{
            if(err){
                res.send(err);
            } else {
                res.render('Category/Danhsach', { cat:data });
            }
        })
    },
    add:(req,res)=>{
        res.render('Category/AddCate');
    },

    create:(req,res)=>{
        Category.create(req.body,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.redirect('/category');
            }
        })
    },
    edit:(req,res)=>{
        Category.findById(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.render('Category/EditCate',{cate:data[0]});
            }
        })
    },
    update:(req,res)=>{
        Category.update(req.body,(err,data)=>{
            if(err) {
                res.send(err);

            } else {
                res.redirect('/category');
            }
        })
    },
    delete:(req,res)=>{
        Category.delete(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.redirect('/category');
            }
        })
    },
}
module.exports = CategoryController;