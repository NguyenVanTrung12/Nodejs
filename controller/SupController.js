var Sup = require('../models/Sup');

var SupController = {
    index:(req,res)=>{
        Sup.getAll((err,data)=>{
            if(err){
                res.send(err);
            } else {
                res.render('Sup/DanhsachSup', { sup:data });
            }
        })
    },
    add:(req,res)=>{
        res.render('Sup/AddSup');
    },

    create:(req,res)=>{
        Sup.create(req.body,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.redirect('/sup');
            }
        })
    },
    edit:(req,res)=>{
        Sup.findById(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.render('Sup/EditSup',{sup:data[0]});
            }
        })
    },
    update:(req,res)=>{
        Sup.update(req.body,(err,data)=>{
            if(err) {
                res.send(err);

            } else {
                res.redirect('/sup');
            }
        })
    },
    delete:(req,res)=>{
        Sup.delete(req.params.id,(err,data)=>{
            if(err) {
                res.send(err);
            }else {
                res.redirect('/sup');
            }
        })
    },
}
module.exports = SupController;