const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Joi = require('joi');
const multer = require('multer')
var path=require('path');
const { create } = require('domain');
const session = require('express-session');
const { check_login } = require('./models/user');
const { use } = require('./controller/UersController');
const authMiddleware = require('./middlewares/authMiddlewares');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'/public')));
app.set('view engine','ejs');
//const pug = require('pug');
//app.use(express.static(path.join(__dirname,'/img')));
app.use(session({
    secret:'abcdefgh', // MÃ bảo mật
    resave:true,
    saveUninitialized:false
}));
app.use((req,res,next)=>{
    res.locals.login = req.session.login;
    next();
})
app.use((req,res,next)=>{
    res.locals.logincus = req.session.logincus;
    next();
})
app.set('view engine','ejs');
require('./router/category.route')(app);
require('./router/brand.route')(app);
require('./router/sup.route')(app);
require('./router/product.route')(app);
require('./router/user.route')(app);
require('./router/cus.route')(app);
require('./router/trangchu.route')(app);
require('./router/sanpham.route')(app);
require('./router/Chitet.route')(app);
require('./router/Lienket.route')(app);
require('./router/danhmuc.route')(app);
require('./router/admin.route')(app);
app.get('/admin',authMiddleware.authcheck,(req,res)=>{
    res.render('Admin/admin');
    
})

// app.get('/trangchulienket',(req,res)=>{
//     res.render('TrangchuLienket/header');
// })
app.listen(3000,()=>console.log("Sever runing..."));

