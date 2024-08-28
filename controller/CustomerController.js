var cus = require('../models/customer');

var CusController = {
    add:(req,res)=>{
        res.render('Taikhoan/dangky_cus');
    },

    create:(req,res)=>{
        cus.create(req.body,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.redirect('/login_cus');
            }
        })
    },
    app:(req,res)=>{
        res.render('Taikhoan/Dangnhap_cus');
    },
    check_login:(req,res)=>{
        cus.check_login(req.body.email,req.body.password,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                req.session.logincus=data;
                return res.redirect('/');
            }
        })
    },
    appp:(req,res)=>{
        req.session.logincus = null;
        return res.redirect('/login_cus');
    }
        
    
}
module.exports = CusController;