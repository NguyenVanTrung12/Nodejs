var Lienket = require('../models/trangchulienket');
var catt = require('../models/Category');
const util = require('util');
const conn = require('../database/connect');
var LienketController = {
   
    add:(req,res)=>{

        const query = util.promisify(conn.query).bind(conn);
        (async () => {
            try {
                
                const cate = await query('SELECT * from product where categoryId');
                const cat = await query('select * from category_sp');
                res.render('TrangchuLienket/header',{cate:cate,cat:cat});
            } finally {

            }
        })()
        
    },
    search:(req,res)=>{
        const query = util.promisify(conn.query).bind(conn);

        (async () => {
            try {
                const cate = await query('SELECT * from product where categoryId');
                const cat = await query('select * from category_sp');
              
                Lienket.search(req.query.key,(err,data)=>{
                    if(err){
                        res.send(err);
                    }else{
                        res.render('Giaodien/Timkiem',{catt:data,cate:cate,cat:cat});
                    }
                    console.log(req.query.key);
                })
                // res.render('admin/Sanpham/AddCate',{cl:cate,ncc:ncc});  
            } finally {
                //conn.end();
            }
        })()
           
        
        
    },
    
}
module.exports = LienketController;