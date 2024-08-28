var Admin = require('../models/admin');
const bcrypt = require('bcrypt');
var AdminController = {
    index:(req,res)=>{
        Admin.getAll((err,data)=>{
            if(err){
                res.send(err);
            } else {
                res.render('Adminn/DanhsachAdmin', { adm:data });
            }
        })
    },
    add:(req,res)=>{
        res.render('Adminn/AddAdmin');
    },
    
    create:(req,res,)=>{
        bcrypt.hash(req.body.password,10).then((hashedPassword)=>{
            var email = req.body.email;
            var name = req.body.name;
            Admin.create(({name, email, password:hashedPassword}),(err,data)=>{
                if(err) {
                    res.send(err);
                }else {
                    res.redirect('/tkadmin');
                }
            })
        })
        
    },
    edit:(req,res)=>{
        Admin.findById(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.render('Adminn/EditAdmin',{adm:data[0]});
            }
        })
    },
    update:(req,res)=>{
        Admin.update(req.body,(err,data)=>{
            if(err) {
                res.send(err);

            } else {
                res.redirect('/tkadmin');
            }
        })
    },
    delete:(req,res)=>{
        Admin.delete(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.redirect('/tkadmin');
            }
        })
    },
}
module.exports = AdminController;