var user = require('../models/user');
const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: false }));
const bcrypt = require('bcrypt');
var UesrController = {
    add:(req,res)=>{
        res.render('Taikhoan/dangky');
    },

    create:(req,res)=>{
        bcrypt.hash(req.body.password,parseInt(10)).then((passmoi)=>{
            var email=req.body.email;
            var name=req.body.name;
            user.create(({name,email,passmoi}),(err,data)=>{
                if(err) {
                    res.send(err);
                }else {
                    res.redirect('/login');
                }
            })
        })
        
    },
    app:(req,res)=>{
        
        res.render('Taikhoan/Dangnhap');
    },
    Dangnhap:(req,res)=>{
        user.check_login(req.body.email,req.body.password,(err,data)=>{
            if(err) {
                res.send(err);
            } else {
                req.session.login=data;
                return res.redirect('/admin');
            }
        })
    },
    appp:(req,res)=>{
        req.session.login = null;
        return res.redirect('/login');
    },
    // use:((req,res,next)=>{
    //     res.locals.login = req.session.login;
    //     next();
    // })
        
    
}
module.exports = UesrController;  